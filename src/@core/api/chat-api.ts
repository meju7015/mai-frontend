import {IBaseResponse} from "@/@core/api/base/interface";
import backend from "@/@core/api/client";

export interface IChat {
    id: number;
    type: 'apiMessage' | 'userMessage';
    message: string;
    sourceDocuments?: IChatSourceDocument[];
}

export interface ICreateChatRequest {
    namespace: string;
    prompt: string;
    histories?: [string, string][];
}

export interface IChatSourceDocument {
    pageContent: string;
    metadata: any;
}

export interface IChatResponseData {
    text: string;
    sourceDocuments: IChatSourceDocument[]
}

export interface ICreateChatResponse extends IBaseResponse {
    data: IChatResponseData;
}

/**
 * 프롬프트를 서버로 전달하여 응답데이터 수신
 * @param req
 */
export const createChat = async (req: ICreateChatRequest) => {
    const response = await backend.post<ICreateChatResponse>('/chat', req);
    return response.data;
}
