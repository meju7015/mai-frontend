import {IUserChatbot} from "@/pages/auth/store/atoms";
import MyChatbotCardItem from "@/components/my-chatbot/my-chatbot-card-item";
import Box from "@mui/material/Box";

export interface IMyChatbotCardListProps {
    chatbots: IUserChatbot[];
}

const MyChatbotCardList = (props: IMyChatbotCardListProps) => {
    const { chatbots } = props;

    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap'}} justifyContent='start' mt={5} gap={3}>
            {chatbots.map((chatbot) => (
                <MyChatbotCardItem key={chatbot.id} chatbot={chatbot} />
            ))}
        </Box>
    )
}

export default MyChatbotCardList;
