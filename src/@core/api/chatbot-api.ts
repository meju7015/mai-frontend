import {IUserChatbot} from "@/pages/auth/store/atoms";
import client from "@/@core/api/client";


export const updateChatbot = async (chatbotId: string, chatbot: IUserChatbot) => {
    const response = await client.put('/chatbot/' + chatbotId, chatbot);
    return response.data;
}
