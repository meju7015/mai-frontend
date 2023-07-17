import {styled} from "@mui/system";
import React from "react";
import { Button, ButtonProps } from '@mui/material';
import {LoadingButton, LoadingButtonProps} from "@mui/lab";

interface IButtonProps extends LoadingButtonProps {}

const StyledButton = styled(LoadingButton)<LoadingButtonProps>(({ theme, color }) => ({
    borderRadius: 7,
    //border: '1px solid #dfdfdf',
    transition: 'all 0.2s ease-in-out',
    //color: theme.palette.text.secondary,
    alignItems: 'center',
/*    backgroundColor: `${color}.main` || '#333',*/
    gap: 10,
    /*'&:hover': {
        backgroundColor: '#dfdfdf',
    }*/
}));

const CustomButton = (props: IButtonProps) => {
    return (
        // @ts-ignore
        <StyledButton {...props}>
            {props.children}
        </StyledButton>
    )
}

export default CustomButton;
