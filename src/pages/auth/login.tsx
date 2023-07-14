import {Box} from "@mui/system";
import CustomButton from "@/@core/components/button";
import GoogleIcon from "@/@core/assets/images/google-icon.svg";
import React, {useState} from "react";
import {Alert, Divider, Link, Stack} from "@mui/material";
import CustomInput from "@/@core/components/input";

const Login = () => {
    const [isValid, setIsValid] = useState<boolean>(false);

    const handleClick = () => {
        location.href = 'http://localhost:8000/auth/google';
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
                    <CustomButton sx={{mb: 3}} variant='outlined' color='primary' fullWidth onClick={handleClick}>
                        <GoogleIcon width="12" height="12" />
                        Sign in with Google
                    </CustomButton>
                    <Divider sx={{mb: 3}} />
                    {isValid && <Alert severity='warning' sx={{mb: 3, fontSize: 12}}>죄송합니다. 현재는 구글 로그인만 가능합니다. 곧 이메일로도 가입해 볼 수 있습니다.</Alert>}
                    <Box sx={{display: 'flex', flexDirection: 'column', mb: 3}} gap={2}>
                        <CustomInput title='Email address' placeholder='Email' fullWidth size='small' />
                        <CustomInput title='Your password' placeholder='Password' fullWidth size='small' />
                    </Box>
                    <CustomButton onClick={() => setIsValid(true)} sx={{mb: 1}} variant='contained' fullWidth color='primary'>sign in</CustomButton>
                    <Box sx={{fontSize: 12, textAlign: 'center'}}>
                        😉 Register for an account? <Link href='#'>Sign up</Link>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}

export default Login;
