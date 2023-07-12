import {Box, styled} from "@mui/system";
import {Button} from "@mui/material";
import {useState} from "react";
import {urlCheck} from "@/@core/utils";
import {createWeb} from "@/@core/api/asset-api";
import {useRouter} from "next/router";

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

const WebBox = () => {
    // ** hooks
    const router = useRouter();

    // ** States
    const [urlText, setUrlText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [urlList, setUrlList] = useState<string[]>([]);

    const handleSend = async (url: string) => {
        if (!urlCheck(url)) {
            alert('올바른 URL 형식이 아닙니다.');
            return;
        }

        setIsLoading(true);
        const response = await createWeb(url);

        if (response.statusCode === 200 && response.data.namespace) {
            await goChat(response.data.namespace)
        } else {
            alert('오류가 발생했습니다.');
            console.error(response);
        }
    }

    const goChat = async (namespace: string) => router.push(`/chat/${namespace}`)

    return (
        <Box>
            <Box display='flex' justifyContent='space-between' gap={2} sx={{marginTop: 3}}>
                <StyledInputElement
                    placeholder='사이트 주소를 입력해 주세요.'
                    value={urlText}
                    onChange={e => setUrlText(e.target.value)}
                />
                <Button variant='contained' onClick={() => handleSend(urlText)}>전송</Button>
            </Box>
            <Box sx={{marginTop: 5}}>
                {urlList.length > 0 && (
                    <>
                        <Box>{urlList.length} 개의 사이트맵 리스트가 있습니다.</Box>
                        <ul>
                            {urlList.map(url => (
                                <li key={url}>{url}</li>
                            ))}
                        </ul>
                    </>
                )}
            </Box>
        </Box>
    );
}

const StyledInputElement = styled('input')(
    ({theme}) => `
      width: 100%;
      box-sizing: border-box;
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5rem;
      padding: 8px 12px;
      border-radius: 8px;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0px 2px 24px ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};

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

export default WebBox;
