import React from "react";
import {IChat} from "@/@core/api/chat-api";

export interface IMessageItemProps {
    message: string;
    sourceDocuments?: ISourceDocuments[];
}

export interface ISourceDocuments {
    metadata: ISourceDocumentMetadata;
    pageContent: string;
}

export interface ISourceDocumentMetadata {
    blobType: string;
    source: string;
}

export type IChatItemProps = IChat;

export interface IChatItemByType {
    apiMessage: (props: IMessageItemProps) => React.ReactNode;
    userMessage: (props: IMessageItemProps) => React.ReactNode;
}
