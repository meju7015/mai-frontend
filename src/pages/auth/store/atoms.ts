import {atom, RecoilState} from "recoil";

export interface IAsset {
    id: number;
}

export interface IAuthUser {
    email: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
    jwt: string;
}

export interface IUser {
    id: number;
    createdAt: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}

export interface IChatbotSetting {
    projectName: string;
    basePrompt: string;
    modelName: string;
    temperature: number;
    visibility: boolean;
    domain?: string;
}

export interface IUserChatbot {
    id: string;
    numberOfCharacters: number;
    startMessage?: string;
    suggestedMessage?: string;
    theme: string;
    isShowProfile: boolean;
    displayName: string;
    userMessageColor: string;
    isShowUserProfile: boolean;
    alignment: string;
    profilePicture?: IAsset;
    userProfilePicture?: IAsset;
    setting: IChatbotSetting
}

export interface IAuthUserMe {
    user: IUser;
    setting: IChatbotSetting;
    chatbots: IUserChatbot[];
}

export const authUserState: RecoilState<IAuthUser> = atom({
    key: 'AuthUser',
    default: {} as IAuthUser,
})

export const meState: RecoilState<IAuthUserMe> = atom({
    key: 'me',
    default: {} as IAuthUserMe,
})
