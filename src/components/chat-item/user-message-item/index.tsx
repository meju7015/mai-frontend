import React from "react";
import {Box} from "@mui/system";
import {IMessageItemProps} from "@/components/chat-item/types";
import ReactMarkdown from "react-markdown";
import {Paper} from "@mui/material";

const UserMessageItem = ({ message }: IMessageItemProps) => {
    return (
        <Paper sx={styles.messageBox} variant="outlined">
            {/* eslint-disable-next-line react/no-children-prop */}
            <ReactMarkdown children={message}></ReactMarkdown>
        </Paper>
    )
}

const styles = {
    messageBox: {
        padding: 2,
        marginTop: 1,
        marginBottom: 1,
    }
}

export default UserMessageItem;
