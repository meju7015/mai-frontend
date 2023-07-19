import {atom, RecoilState} from "recoil";
import {IUserChatbot} from "@/pages/auth/store/atoms";

export const selectedChatbotState: RecoilState<IUserChatbot> = atom({
    key: 'selectedChatbot',
    default: {} as IUserChatbot,
});
