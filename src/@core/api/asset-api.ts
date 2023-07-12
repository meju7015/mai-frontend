import backend from "@/@core/api/client";
import {IBaseResponse} from "@/@core/api/base/interface";
import FormData from "form-data";

interface IAsset {
    id: number;
    uuid: string;
    name: string;
    contentType: string;
    createdAt: Date;
}

interface INamespace {
    namespace: string;
}

interface ICreateAssetResponse extends IBaseResponse {
    data: IAsset;
}

interface ICreateResponse extends IBaseResponse {
    data: INamespace;
}

interface ICreatePlainTextRequest {
    plainText: string;
}

export interface IGetSitemapResponse extends IBaseResponse {
    data: string[];
}

/**
 * Asset(파일) 업르도
 * @param file
 */
export const createAsset = async (file: File): Promise<ICreateAssetResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await backend.post<ICreateAssetResponse>('/assets', formData);
    return response.data;
}

/**
 * PDF 를 업로드 하고 벡터 저장소에 저장후
 * namespace 를 반환
 * @param file
 */
export const createPdf = async (file: File): Promise<ICreateResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await backend.post<ICreateResponse>('/assets/pdf', formData);
    return response.data;
}

/**
 * 텍스트파일을 업로드 하고 벡터 저장소에 저장후
 * namespace 를 반환
 * @param file
 */
export const createText = async (file: File): Promise<ICreateResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await backend.post<ICreateResponse>('/assets/text', formData);
    return response.data;
}

/**
 * 텍스트를 업로드 하고 벡터 저장소에 저장후
 * namespace 를 반환
 * @param plainText
 */
export const createPlainText = async (plainText: string): Promise<ICreateResponse> => {
    const req: ICreatePlainTextRequest = { plainText };

    const response = await backend.post<ICreateResponse>('/assets/plain-text', req);
    return response.data;
}

/**
 * url 에 대한 sitemap 추출
 * @param url
 */
export const getSitemap = async (url: string): Promise<IGetSitemapResponse> => {
    const req = { url };

    const response = await backend.post(`/assets/sitemap`, req);
    return response.data;
}

/**
 * url 에 대한 사이트맵을 추출하여 유효한 데이터를 얻은뒤
 * 벡터 저장소에 저장한 후 namespace 를 반환
 * @param url
 */
export const createWeb = async (url: string): Promise<ICreateResponse> => {
    const req = { url };

    const response = await backend.post<ICreateResponse>(`/assets/web`, req);
    return response.data;
}
