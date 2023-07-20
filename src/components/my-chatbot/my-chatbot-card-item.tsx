import {IUserChatbot} from "@/pages/auth/store/atoms";
import {Card, CardMedia, Typography} from "@mui/material";
import Image from "next/image";
import {Icon} from "@iconify/react";
import {useState} from "react";
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {selectedChatbotState} from "@/pages/chatbot/store/atoms";

export interface IMyChatbotCardItemProps {
    chatbot: IUserChatbot;
}

const MyChatbotCardItem = (props: IMyChatbotCardItemProps) => {
    // ** Props
    const {chatbot} = props;

    // ** States
    const [hover, setHover] = useState<boolean>(false);

    // ** Hooks
    const router = useRouter();
    const [, setSelectedChatbot] = useRecoilState(selectedChatbotState);

    const handleClick = () => {
        setSelectedChatbot(chatbot);
        router.push(`/chatbot/${chatbot.id}`)
    }

    return (
        <Card sx={{p: 1, cursor: 'pointer'}}
              elevation={hover ? 4 : 1}
              onMouseOver={e => setHover(true)}
              onMouseOut={e => setHover(false)}
              onClick={handleClick}
        >
            <CardMedia sx={{p: 4}}>
                {chatbot?.profilePicture ? (
                    <Image src='' alt='chatbot' width={60} height={60}/>
                ) : (
                    <Icon icon='mingcute:chat-4-line' width={60} height={60}/>
                )}
            </CardMedia>
            <Typography variant='subtitle2'>{chatbot.setting.projectName}</Typography>
        </Card>
    )
}

export default MyChatbotCardItem;
