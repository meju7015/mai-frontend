import {useEffect, useRef, useState} from "react";
import {getEnv} from "@/@core/utils";
import {IAuthUser} from "@/pages/auth/store/atoms";
import Storage from "@/@core/utils/StorageUtil";
import {authConfig} from "@/@core/config/authConfig";
import {useRouter} from "next/router";
import {useAuth} from "@/@core/hooks/useAuth";
import Cookies from 'js-cookie';

type GoogleAuthCallback = (authUser: IAuthUser) => void;

const useGoogleAuth = () => {
    // ** Hooks
    const router = useRouter();
    const auth = useAuth();

    // ** Refs
    const loginCallback = useRef<GoogleAuthCallback>();

    // ** States
    const [popup, setPopup] = useState<Window | null>();

    useEffect(() => {
        if (!popup) return;

        window.addEventListener('message', listener, false);

        return () => {
            window.removeEventListener('message', listener);
            popup?.close();
            setPopup(null);
        }
    }, [popup])

    const login = (callback?: GoogleAuthCallback) => {
        const popup = window.open(
            getEnv('NEXT_BACKEND_URL', 'http://localhost:8000') + '/auth/google',
            '_blank',
            'width=500,height=600'
        )

        if (callback) {
            loginCallback.current = callback;
        }

        setPopup(popup);
    }

    const listener = (e: MessageEvent) => {
        if (e.origin !== window.location.origin) {
            return;
        }

        if (e.data?.jwt) {
            auth.setJwt(e.data.jwt);
            Cookies.set('jwt', e.data.jwt)
            Storage.setItem(authConfig.storageTokenKeyName, e.data.jwt);
            const returnUrl = router.query.returnUrl;
            const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/';

            if (loginCallback.current) {
                loginCallback.current(e.data);
            }

            popup?.close();
            setPopup(null);

            router.replace(redirectURL as string);
        }
    }

    return {login, popup}
}

export default useGoogleAuth;
