import {Box} from "@mui/system";
import CustomButton from "@/@core/components/button";
import GoogleIcon from "@/@core/assets/images/google-icon.svg";
import React, {useState} from "react";
import {Alert, Divider, Link, Stack} from "@mui/material";
import CustomInput from "@/@core/components/input";
import * as yup from 'yup';
import {useAuth} from "@/@core/hooks/useAuth";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import useGoogleAuth from "@/@core/hooks/useGoogleAuth";
import {authUserState} from "@/pages/auth/store/atoms";
import {useRecoilState} from "recoil";

const schema = yup.object().shape({
    email: yup.string().email('이메일 형식으로 입력해주세요.').required('이메일 주소를 입력해 주세요.'),
    password: yup.string().min(5, '비밀번호는 5자리 이상 입력해 주세요.').required('비밀번호를 입력해 주세요.'),
})

interface FormData {
    email: string;
    password: string;
}

const Login = () => {
    const [isValid, setIsValid] = useState<boolean>(false);

    const [rememberMe, setRememberMe] = useState<boolean>(true);

    // ** Hooks
    const auth = useAuth();
    const googleAuth = useGoogleAuth();
    const [authUser, setAuthUser] = useRecoilState(authUserState);

    // ** Form
    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: { email: '', password: '' }
    })

    const handleGoogleLoginButton = () => {
        googleAuth.login();
    }

    const onSubmit = (data: FormData) => {
        const { email, password } = data;
        auth.login({ email, password, rememberMe }, (err) => {
            setError('email', {
                type: 'manual',
                message: err?.message || '서버와의 연결이 원활하지 않습니다.',
            })
        })
    }

    return (
        <Box
            sx={{
                p: [6, 25],
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box sx={{ width: '100%', maxWidth: 300 }}>
                <Box sx={{textAlign: 'center', fontSize: 25, mb: 5, color: 'text.light'}}>MAI CHATBOT</Box>
                <Stack>
                    <CustomButton sx={{mb: 3}} variant='outlined' color='primary' fullWidth onClick={handleGoogleLoginButton}>
                        <GoogleIcon width="12" height="12" />
                        Sign in with Google
                    </CustomButton>
                    <Divider sx={{mb: 3}} />
                    {isValid && <Alert severity='warning' sx={{mb: 3, fontSize: 12}}>죄송합니다. 현재는 구글 로그인만 가능합니다. 곧 이메일로도 가입해 볼 수 있습니다.</Alert>}
                    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{display: 'flex', flexDirection: 'column', mb: 3}} gap={2}>
                        <Controller
                            name='email'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur }}) => (
                                <CustomInput
                                    size='small'
                                    title='Email address'
                                    placeholder='Email'
                                    fullWidth
                                    error={Boolean(errors.email)}
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    {...(errors.email && { helperText: errors.email.message })}
                                />
                            )}
                        />
                        <Controller
                            name='password'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur }}) => (
                                <CustomInput
                                    type='password'
                                    title='Your password'
                                    placeholder='Password'
                                    fullWidth size='small'
                                    error={Boolean(errors.password)}
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    {...(errors.password && { helperText: errors.password.message })}
                                />
                            )}
                        />
                    </Box>
                        <CustomButton type='submit' sx={{mb: 1}} variant='contained' fullWidth color='primary' loading={auth.loading}>
                            sign in
                        </CustomButton>
                    </form>
                    <Box sx={{fontSize: 12, textAlign: 'center'}}>
                        😉 Register for an account? <Link href='#'>Sign up</Link>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}

Login.guestGuard = true;

export default Login;
