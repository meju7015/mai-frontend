import {atom, RecoilState} from "recoil";

export interface IAuthUser {
    email: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
    jwt: string;
}

export const authUserState: RecoilState<IAuthUser> = atom({
    key: 'AuthUser',
    default: {} as IAuthUser,
})
