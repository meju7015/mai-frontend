import {styled} from "@mui/system";
import {TextField, TextFieldProps} from "@mui/material";
import InputTitle from "@/@core/components/text/input-title";

const StyledInput = styled(TextField)<TextFieldProps>(({size, theme}) => ({
    transition: 'all 0.2s ease-in-out',
    //padding: '10px 12px 10px 12px',
    borderRadius: 7,
    width: '100%',
    boxSizing: 'border-box',
    '& .MuiInputBase-input': {
        fontSize: size && size === 'small' ? 12 : 14,
    },
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
            {props.title && <InputTitle>{props.title}</InputTitle>}
            <StyledInput {...props} />
        </>
    )
}

export default CustomInput;
