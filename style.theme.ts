import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: [
            'noto-sans-ko',
            'Roboto',
        ].join(',')
    },
    palette: {
        primary: {
            main: '#383838'
        },
        secondary: {
            main: '#fff'
        },
        text: {
            primary: '#4d4d4d',
            secondary: '#6b6b6b',
            light: '#ebebeb',
        },

    }
});

export default theme
