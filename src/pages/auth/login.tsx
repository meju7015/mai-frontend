import {Box} from "@mui/system";
import {Button} from "@mui/material";

const Login = () => {
    const handleClick = () => {
        location.href = 'http://localhost:8000/auth/google';
    }

    return (
        <Box>
            <Button onClick={handleClick}>로그인</Button>
        </Box>
    )
}

export default Login;
