import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from "react";
import {Box, Container} from "@mui/system";
import {Alert, Button, ButtonGroup, Grid, Input, TextField} from "@mui/material";
import {createChat, IChat, ICreateChatRequest} from "@/@core/api/chat-api";
import ChatItem from "@/components/chat-item";
import useRouteParams from "@/@core/hooks/useRouteParams";
import useScrollToBottom from "@/@core/hooks/useScrollToBottom";
import {LoadingButton} from "@mui/lab";
import apiMessageItem from "@/components/chat-item/api-message-item";

export interface IChatParams {
    namespace: string;
}

const Chat = () => {
    // ** hooks
    const {namespace} = useRouteParams<IChatParams>();
    const observer = useScrollToBottom()

    // ** Refs
    const chatId = useRef<number>(1);

    // ** States
    const [prompt, setPrompt] = useState<string>('');
    const [histories, setHistories] = useState<[string, string][]>([]);
    const [chatList, setChatList] = useState<IChat[]>([])
    const [apiMessageList, setApiMessageList] = useState<IChat[]>([]);
    const [userMessageList, setUserMessageList] = useState<IChat[]>([]);
    const [isError, setIsError] = useState<boolean>(false);
    const [isAITyping, setIsAITyping] = useState<boolean>(false);

    useEffect(() => {
        setApiMessageList(apiMessageList.concat({
            id: chatId.current++,
            type: 'apiMessage',
            message: '안녕하세요 무엇을 도와드릴까요 ? 🙂'
        }))
    }, [])

    useEffect(() => {
        setChatList([
            ...userMessageList,
            ...apiMessageList,
        ].sort((a, b) => a.id - b.id));
    }, [apiMessageList, userMessageList]);

    useEffect(() => {
        const run = async () => {
            if (namespace) {
                const firstQuestion = "문서의 제목을 첫번째로 표시해주고 문서를 요약해줘, 그리고 질문 2가지를 알려줘, 그 밑에 유용한 링크가 있다면 같이 알려줘 항목에 대한 타이틀을 표시하지는 말아줘";
                const data = await requestCreateChat(firstQuestion, namespace, histories);

                setApiMessageList(apiMessageList.concat({
                    id: chatId.current++,
                    type: 'apiMessage',
                    message: data.text,
                    sourceDocuments: data.sourceDocuments,
                }));
            }
        }

        //run();
    }, [namespace]);

    const handleSend = async (_prompt: string) => {
        if (!_prompt) {
            setIsError(true);
            return;
        }

        setUserMessageList([
            ...userMessageList,
            {
                id: chatId.current++,
                type: 'userMessage',
                message: _prompt
            }
        ]);

        const data = await requestCreateChat(_prompt, namespace, histories);

        console.log(data);

        setApiMessageList(apiMessageList.concat({
            id: chatId.current++,
            type: 'apiMessage',
            message: data.text,
            sourceDocuments: data.sourceDocuments,
        }))
    }

    const requestCreateChat = async (_prompt: string, namespace: string, histories?: [string, string][]) => {
        const request: ICreateChatRequest = {
            prompt: _prompt,
            histories,
            namespace,
        }

        setIsAITyping(true);
        const response = await createChat(request);
        setIsAITyping(false);
        return response.data;
    }

    const handleOnClick = async () => {
        handleSend(prompt);
        setPrompt('');
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value)
        setIsError(false);
    }

    const handleOnKeyDown = async (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend(prompt);
            setPrompt('');
        }
    }

    return <Container>
        <Box sx={style.chatBox}>
            <Grid sx={style.chatBox}>
                {chatList.map((chat, index) => {
                    return <Box key={index}>
                        <ChatItem id={chat.id} type={chat.type} message={chat.message} sourceDocuments={chat.sourceDocuments}/>
                    </Box>
                })}
            </Grid>

            <Box sx={style.inputBox}>
                <TextField
                    fullWidth
                    error={isError}
                    value={prompt}
                    disabled={isAITyping}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    placeholder='질문을 입력해보세요.'/>
                <LoadingButton
                    loading={isAITyping}
                    sx={{marginLeft: 1}}

                    variant="outlined"
                    onClick={handleOnClick}>
                    전송
                </LoadingButton>
            </Box>
        </Box>
    </Container>;
}

const style = {
    inputBox: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 3,
        marginBottom: 3,
    },
    chatBox: {
        marginTop: 3,
    }
}

export default Chat;
