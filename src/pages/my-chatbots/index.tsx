import {Container} from "@mui/system";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import CustomButton from "@/@core/components/button";
import {useEffect} from "react";
import {useAuth} from "@/@core/hooks/useAuth";
import Spinner from "@/@core/components/spinner";
import MyChatbotCardList from "@/components/my-chatbot/my-chatbot-card-list";

const MyChatbotsPage = () => {
    const { me } = useAuth();

    useEffect(() => {
        console.log(me);
    }, [me]);

    if (!me) {
        return <Spinner />
    }

    return (
        <Container sx={{mt: 10}}>
            <Box sx={{display: 'flex'}} justifyContent='space-between'>
                <Box>
                    <Typography variant='h4' sx={{fontWeight: 600}}>My Chatbots</Typography>
                    <Typography variant='subtitle2'>{me.chatbots.length - 2}개의 챗봇 생성 가능</Typography>
                </Box>
                <Box>
                    <CustomButton variant='contained' disabled={me.chatbots.length < 2}>새 챗봇 생성</CustomButton>
                </Box>
            </Box>
            <Box>
                <MyChatbotCardList chatbots={me.chatbots} />
            </Box>
        </Container>
    )
}

export default MyChatbotsPage;
