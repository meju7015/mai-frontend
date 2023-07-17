import {Box, styled} from "@mui/system";
import {TextField, TextFieldProps} from "@mui/material";

const StyledInput = styled(TextField)<TextFieldProps>(({theme}) => ({
    transition: 'all 0.2s ease-in-out',
    //padding: '10px 12px 10px 12px',
    borderRadius: 7,
    width: '100%',
    boxSizing: 'border-box',
    //border: '1px solid #dfdfdf',
    outline: 'none',

    '&:focus': {
        outline: 'none',
        border: `1px solid ${theme.palette.text.secondary}`,
    },
    '::placeholder': {
        color: theme.palette.text.light,
    }
}));

const CustomInput = (props: any) => {
    return (
        <>
            {props.title && <Box sx={{fontSize: 12, color: 'text.secondary'}}>
                {props.title}
            </Box>}
            <StyledInput {...props} />
        </>
    )
}

export default CustomInput;
