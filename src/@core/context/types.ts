import {IAuthUser, IAuthUserMe} from "@/pages/auth/store/atoms";

export type ErrCallbackType = (err: { [key: string]: string }) => void;

export enum LoginStrategy {
    BASIC = 'basic',
    GOOGLE = 'google',
}

export type AuthValuesType = {
    me: IAuthUserMe | null;
    jwt: string | null;
    loading: boolean;
    logout: () => void;
    user: IAuthUser | null;
    setMe: (value: IAuthUserMe) => void;
    setJwt: (value: string) => void;
    setLoading: (value: boolean) => void;
    setUser: (value: IAuthUser | null) => void;
    login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
}

export type LoginParams = {
    email: string;
    password: string;
    rememberMe?: boolean;
}
