import React from "react";
import ApiMessageItem from "@/components/chat-item/api-message-item";
import UserMessageItem from "@/components/chat-item/user-message-item";
import {IChatItemByType, IChatItemProps, IMessageItemProps} from "@/components/chat-item/types";

const ChatItem = ({ type, message, sourceDocuments }: IChatItemProps) => {
    const typeComponent: IChatItemByType = {
        apiMessage: ApiMessageItem,
        userMessage: UserMessageItem,
    }

    const Component = typeComponent[type];
    return <Component message={message} sourceDocuments={sourceDocuments} />
}

export default ChatItem;
