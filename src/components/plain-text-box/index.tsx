import {TextareaAutosize} from "@mui/material";
import {styled} from "@mui/system";
import {LoadingButton} from "@mui/lab";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {createPlainText} from "@/@core/api/asset-api";

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const PlainTextBox = () => {
    //** Hooks
    const router = useRouter();

    //** States
    const [plainText, setPlainText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleOnClick = async () => {
        if (!plainText) {
            alert('내용을 입력해주세요.');
            return;
        }

        if (plainText.length < 100) {
            alert('내용은 100자 이상 입력해야 합니다.');
            return;
        }

        const response = await handleSend(plainText);

        if (response.statusCode === 201 && response.data.namespace) {
            await goChat(response.data.namespace)
        } else {
            alert('오류가 발생했습니다.');
            console.error(response);
        }
    }

    const handleSend = async (plainText: string) => {
        setIsLoading(true);
        const response = await createPlainText(plainText);
        setIsLoading(false);

        return response;
    }

    const goChat = async (namespace: string) => router.push(`/chat/${namespace}`);

    useEffect(() =>{
        console.log(plainText);
    }, [plainText])

    return (
        <>
            <StyledTextarea minRows={5} aria-label='plain text' value={plainText} onChange={e => setPlainText(e.target.value)} placeholder='여기에 데이터를 입력해 보세요.'/>
            <LoadingButton
                sx={{width: '100%', marginTop: 1,}}
                loading={isLoading}
                variant='contained'
                onClick={handleOnClick}>
                전송
            </LoadingButton>
        </>
    );
};

const StyledTextarea = styled(TextareaAutosize)(
    ({theme}) => `
        width: 100%;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        box-sizing: border-box;
        border-radius: 12px 12px 0 12px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 24px ${
        theme.palette.mode === 'dark' ? blue[900] : blue[100]
    };
      
        &:hover {
          border-color: ${blue[400]};
        }
      
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }
      
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `,
);


export default PlainTextBox;
