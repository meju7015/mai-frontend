import {Container} from "@mui/system";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import CustomButton from "@/@core/components/button";
import MyChatbotCardList from "@/components/my-chatbot/my-chatbot-card-list";
import {IUserChatbot} from "@/pages/auth/store/atoms";
import {GetServerSideProps} from "next/types";
import {useRouter} from "next/router";

export interface IMyChatbotPageProps {
    chatbots: IUserChatbot[];
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const jwt = req.cookies.jwt;

    if (!jwt) {
        // TODO :: 인증 실패로 에러 핸들링
        return { notFound: true }
    }

    const response = await fetch(`${process.env.NEXT_BACKEND_URL}/chatbot`, {
        headers: { Authorization: `Bearer ${jwt}` }
    });

    const chatbots = await response.json();

    return {
        props: { chatbots: chatbots.data }
    }
}

const MyChatbotsPage = (props: IMyChatbotPageProps) => {
    const { chatbots } = props;

    const router = useRouter();

    const handleCreateChatbot = () => {
        router.push('/my-chatbots/create');
    }

    return (
        <Container sx={{mt: 10}}>
            <Box sx={{display: 'flex'}} justifyContent='space-between'>
                <Box>
                    <Typography variant='h4' sx={{fontWeight: 600}}>My Chatbots</Typography>
                    <Typography variant='subtitle2'>{chatbots.length - 2}개의 챗봇 생성 가능</Typography>
                </Box>
                <Box>
                    <CustomButton variant='contained' disabled={chatbots.length < 2} onClick={handleCreateChatbot}>새 챗봇 생성</CustomButton>
                </Box>
            </Box>
            <Box>
                <MyChatbotCardList chatbots={chatbots} />
            </Box>
        </Container>
    )
}

export default MyChatbotsPage;
