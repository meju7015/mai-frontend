import {GetServerSideProps} from "next/types";
import {Container} from "@mui/system";
import Box from "@mui/material/Box";
import {MenuItem, Select, Stack, Typography} from "@mui/material";
import {IUserChatbot} from "@/pages/auth/store/atoms";
import CustomInput from "@/@core/components/input";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputTitle from "@/@core/components/text/input-title";

export interface IChatbotPageParams {
    chatbotId: string;
    chatbot: IUserChatbot;
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const jwt = req.cookies.jwt;
    const chatbotId = query.chatbotId;

    if (!jwt || !chatbotId) {
        return { notFound: true }
    }

    const response = await fetch(`${process.env.NEXT_BACKEND_URL}/chatbot/${chatbotId}`, {
        headers: { Authorization: `Bearer ${jwt}` }
    })
    const chatbot = await response.json();

    return {
        props: { chatbotId, chatbot: chatbot.data }
    }
}

const schema = yup.object().shape({
    displayName: yup.string().required(),
    setting: yup.object().shape({
        basePrompt: yup.string().required(),
        modelName: yup.string()
    })
})

const ChatBotPage = (props: IChatbotPageParams) => {
    const { chatbotId, chatbot } = props;

    const {
        control,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        defaultValues: chatbot,
        resolver: yupResolver(schema),
    })

    return (
        <Container sx={{mt: 10}}>
            <Box sx={{display: 'flex'}} justifyContent='space-between'>
                <Box>
                    <Typography variant='h4' sx={{fontWeight: 600}}>{chatbot.displayName}</Typography>
                </Box>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', mt: 5}} gap={3}>
                <Stack gap={1}>
                    <InputTitle>챗봇 아이디</InputTitle>
                    <Typography sx={{fontWeight: 600}}>{chatbot.id}</Typography>
                </Stack>

                <Stack gap={1}>
                    <InputTitle>학습한 문자 수</InputTitle>
                    <Typography sx={{fontWeight: 600}}>{chatbot.numberOfCharacters}</Typography>
                </Stack>

                <Stack gap={1}>
                    <Controller
                        name='displayName'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur} }) => (
                            <CustomInput
                                title='챗봇 이름'
                                size='small'
                                placeholder='챗봇 이름을 입력해 주세요.'
                                error={Boolean(errors.displayName)}
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                {...(errors.displayName && { helperText: errors.displayName.message })}
                            />
                        )}
                    />
                </Stack>

                <Stack gap={1}>
                    <Controller
                        name='setting.basePrompt'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur} }) => (
                            <CustomInput
                                title='기본 프롬프트'
                                size='small'
                                placeholder='기본프롬프를 입력해 주세요.'
                                error={Boolean(errors.setting?.basePrompt)}
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                multiline
                                {...(errors.setting?.basePrompt && { helperText: errors.setting?.basePrompt.message })}
                            />
                        )}
                    />
                </Stack>

                <Stack gap={1}>
                    <InputTitle>모델 선택</InputTitle>
                    <Controller
                        name='setting.modelName'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur} }) => (
                            <Select size='small' sx={{fontSize: 11}} value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur}>
                                <MenuItem sx={{fontSize: 11}} value={'gpt-3.5-turbo'}>gtp-3.5-turbo</MenuItem>
                                <MenuItem sx={{fontSize: 11}} value={'gpt-4'}>gpt-4</MenuItem>
                            </Select>
                        )}
                    />
                </Stack>
            </Box>
        </Container>
    )
}

export default ChatBotPage;
