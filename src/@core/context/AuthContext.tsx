import {createContext, ReactNode, useEffect, useState} from "react";
import {AuthValuesType, ErrCallbackType, LoginParams} from "@/@core/context/types";
import {IAuthUser, meState} from "@/pages/auth/store/atoms";
import {useRouter} from "next/router";
import Storage from "@/@core/utils/StorageUtil";
import client from "@/@core/api/client";
import {authConfig} from "@/@core/config/authConfig";
import {useRecoilState} from "recoil";

type LoginProcessParams = {
    rememberMe?: boolean;
}

type Props = {
    children: ReactNode;
}

const defaultProvider: AuthValuesType = {
    me: null,
    jwt: null,
    user: null,
    loading: true,
    setMe: () => null,
    setUser: () => null,
    setJwt: () => null,
    setLoading: () => Boolean,
    logout: () => Promise.resolve(),
    login: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }: Props) => {
    // ** global States
    const [me, setMe] = useRecoilState(meState);

    // ** States
    const [user, setUser] = useState<IAuthUser | null>(defaultProvider.user)
    const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
    const [jwt, setJwt] = useState<string | null>(defaultProvider.jwt)

    // ** Hooks
    const router = useRouter();

    useEffect(() => {
        const initAuth= async (): Promise<void> => {
            const storedToken = Storage.getItem(authConfig.storageTokenKeyName)!;
            if (storedToken) {
                setLoading(true);
                await client.get(authConfig.meEndPoint, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                .then(async response => {
                    setLoading(false);
                    setJwt(storedToken);
                    setMe(response.data.data);
                })
                .catch(() => {
                    Storage.removeItem(authConfig.storageTokenKeyName)
                    setJwt(null);
                    setLoading(false)
                    if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
                        router.replace('/auth/login');
                    }
                })
            } else {
                setLoading(false);
            }
        }

        initAuth();
    }, []);

    const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType): Promise<void> => {
        client
            .post(authConfig.loginEndpoint, params)
            .then(async response => {
                if (params.rememberMe) {
                    const jwt = response.data.jwt;
                    Storage.setItem(authConfig.storageTokenKeyName, jwt);
                    setJwt(jwt);
                }

                const returnUrl = router.query.returnUrl;
                const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/';

                setLoading(false);
                router.replace(redirectURL as string);
            })
            .catch(error => {
                if (errorCallback) errorCallback(error);
            })
    }

    const handleLogout = () => {
        setUser(null)
        Storage.removeItem('userData')
        Storage.removeItem(authConfig.storageTokenKeyName)
        router.push('/auth/login');
    }

    const values: AuthValuesType = {
        me,
        jwt,
        user,
        loading,
        setMe,
        setJwt,
        setUser,
        setLoading,
        login: handleLogin,
        logout: handleLogout,
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
