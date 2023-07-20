import {Container, styled} from "@mui/system";
import Box from "@mui/material/Box";
import {MenuItem, Select, Slider, Stack, Typography} from "@mui/material";
import {IUserChatbot} from "@/pages/auth/store/atoms";
import CustomInput from "@/@core/components/input";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputTitle from "@/@core/components/text/InputTitle";
import InputFooter from "@/@core/components/text/InputFooter";
import CustomButton from "@/@core/components/button";
import useToast from "@/@core/hooks/useToast";
import {useRouter} from "next/router";

const schema = yup.object().shape({
    numberOfCharacters: yup.number(),
    displayName: yup.string(),
    startMessage: yup.string(),
    suggestedMessage: yup.string().nullable(),
    isShowProfile: yup.boolean(),
    alignment: yup.string(),
    theme: yup.string(),
    setting: yup.object().shape({
        projectName: yup.string().required(),
        basePrompt: yup.string().required(),
        modelName: yup.string(),
        temperature: yup.number(),
        visibility: yup.boolean(),
    })
})

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

const defaultChatbot = {
    numberOfCharacters: 0,
    startMessage: '안녕하세요',
    theme: 'light',
    isShowProfile: false,
    displayName: '',
    userMessageColor: '#000000',
    isShowUserProfile: false,
    alignment: 'left',
    setting: {
        projectName: '',
        basePrompt: '',
        modelName: 'gpt3.5-turbo',
        temperature: 1,
        visibility: true,
        domain: '',
    }
}


const CreateChatbotPage = () => {
    const { toast } = useToast();
    const router = useRouter();

    const {
        control,
        setError,
        handleSubmit,
        formState: { errors, isLoading, isSubmitting },
    } = useForm({
        mode: 'onBlur',
        defaultValues: defaultChatbot,
        // @ts-ignore
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data: IUserChatbot) => {
        /*updateChatbot(chatbotId, data)
            .then(() => {
                toast('수정되었습니다.', 'success');
            })
            .catch(({ response }) => {
                if (response.data) {
                    toast(response.data.message.join('\n'), 'error');
                }
            })*/
    }

    const handleBackButton = () => {
        router.push('/my-chatbots')
    }

    return (
        <Container sx={{mt: 10}}>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{display: 'flex'}} justifyContent='space-between'>
                    <Box>
                        <Typography variant='h4' sx={{fontWeight: 600}}>새로운 챗봇 생성</Typography>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', mt: 5}} gap={3}>
                    {/*<Stack gap={1}>
                        <InputTitle>챗봇 아이디</InputTitle>
                        <Typography sx={{fontWeight: 600}}>{chatbot.id}</Typography>
                    </Stack>*/}

                    <Stack gap={1}>
                        <InputTitle>학습한 문자 수</InputTitle>
                        <Typography sx={{fontWeight: 600}}>0</Typography>
                    </Stack>

                    <Stack gap={1}>
                        <Controller
                            name='setting.projectName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur} }) => (
                                <CustomInput
                                    title='프로젝트 이름'
                                    size='small'
                                    placeholder='프로젝트 이름을 입력해 주세요.'
                                    error={Boolean(errors.setting?.projectName)}
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    {...(errors.setting?.projectName && { helperText: errors.setting?.projectName.message })}
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
                                    <MenuItem sx={{fontSize: 11}} value={'gpt3.5-turbo'}>gtp3.5-turbo</MenuItem>
                                    <MenuItem sx={{fontSize: 11}} value={'gpt-4'}>gpt-4</MenuItem>
                                </Select>
                            )}
                        />
                        <InputFooter>gpt-3.5-turbo를 사용하는 1개의 메시지에는 1개의 메시지 크레딧이, gpt-4를 사용하는 1개의 메시지는 20개의 메시지 크레딧이 필요합니다.</InputFooter>
                    </Stack>

                    <Stack gap={1}>
                        <InputTitle>온도</InputTitle>
                        <Controller
                            name='setting.temperature'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur }}) => (
                                <>
                                    <Slider
                                        size='small'
                                        defaultValue={value}
                                        onChange={(_, value) => onChange(value as number)}
                                        onBlur={onBlur}
                                        valueLabelDisplay="auto"
                                        step={0.1}
                                        min={0}
                                        max={1}
                                    />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            mt: -2,
                                        }}
                                    >
                                        <TinyText>정적인</TinyText>
                                        <TinyText>창의적인</TinyText>
                                    </Box>
                                </>
                            )}
                        />
                    </Stack>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', mt: 5}} gap={3}>
                    <Box>
                        <Typography variant='h6' sx={{fontWeight: 600}}>채팅 인터페이스</Typography>
                        <Typography variant='subtitle2'>웹사이트의 채팅 스타일을 정의하세요.</Typography>
                    </Box>

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
                                    multiline
                                    {...(errors.displayName && { helperText: errors.displayName.message })}
                                />
                            )}
                        />
                    </Stack>

                    <Stack gap={1}>
                        <Controller
                            name='startMessage'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur} }) => (
                                <CustomInput
                                    title='시작 메시지'
                                    size='small'
                                    placeholder='시작 메시지를 입력해 주세요.'
                                    error={Boolean(errors.startMessage)}
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    multiline
                                    {...(errors.startMessage && { helperText: errors.startMessage.message })}
                                />
                            )}
                        />
                    </Stack>

                    <Stack gap={1}>
                        {/*<Controller
                            name='suggestedMessage'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur} }) => (
                                <CustomInput
                                    title='추천 메시지를 입력해 주세요.'
                                    footerText='한줄에 메세지 하나씩 입력해 주세요.'
                                    size='small'
                                    placeholder='추천 메시지를 입력해 주세요.'
                                    error={Boolean(errors.suggestedMessage)}
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    multiline
                                    {...(errors.suggestedMessage && { helperText: errors.suggestedMessage.message })}
                                />
                            )}
                        />*/}
                    </Stack>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', mt: 5, mb: 5}} gap={3}>
                    <Box sx={{display: 'flex'}} justifyContent='space-between'>
                        <CustomButton type='button' variant='contained' onClick={handleBackButton}>뒤로</CustomButton>
                        <CustomButton loading={isSubmitting} type='submit' variant='contained'>모두 저장</CustomButton>
                    </Box>
                </Box>
            </form>
        </Container>
    )
}

export default CreateChatbotPage;
