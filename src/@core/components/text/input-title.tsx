import {ReactNode} from "react";
import {Typography} from "@mui/material";

interface IInputTitleProps {
    children: ReactNode;
}

const InputTitle = ({ children }: IInputTitleProps) => {
    return (
        <Typography sx={{fontSize: 12}} color='text.secondary'>
            {children}
        </Typography>
    )
}

export default InputTitle;
