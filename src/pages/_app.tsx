import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import '@/styles/global.css';
import {ThemeProvider} from "@mui/system";
import theme from "../../style.theme";

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <main className={inter.variable}>
                <Component {...pageProps} />
            </main>
        </ThemeProvider>
    );
}

export default MyApp;
