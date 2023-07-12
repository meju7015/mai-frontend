import React from "react";
import {Box} from "@mui/system";
import {IMessageItemProps} from "@/components/chat-item/types";
import ReactMarkdown from "react-markdown";
import {Divider, Paper} from "@mui/material";

const ApiMessageItem = ({ message, sourceDocuments }: IMessageItemProps) => {
    return (
        <Paper sx={styles.messageBox} variant="outlined">
            {/* eslint-disable-next-line react/no-children-prop */}
            <ReactMarkdown children={message}></ReactMarkdown>
            {sourceDocuments && (
                <>
                    <Divider sx={{ marginTop: 2, marginBottom: 2,}} />
                    <Box>
                        <Box sx={{fontSize: 11}}>인용된 데이터</Box>
                        <ul>
                        {sourceDocuments.map((doc, index) => (
                            <li style={styles.quotationBox} key={index}>
                                {doc.pageContent}
                            </li>
                        ))}
                        </ul>
                    </Box>
                </>
            )}
        </Paper>
    )
}

const styles = {
    messageBox: {
        padding: 2,
        marginTop: 1,
        marginBottom: 1,
        backgroundColor: '#eee',
    },
    quotationBox: {
        fontSize: 10,
    }
}

export default ApiMessageItem;
