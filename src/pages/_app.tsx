import type {AppProps} from 'next/app';
import {Inter} from 'next/font/google';
import '@/styles/global.css';
import {ThemeProvider} from "@mui/system";
import theme from "../../style.theme";
import {RecoilRoot} from "recoil";

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

function MyApp({Component, pageProps}: AppProps) {
    return (
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <main className={inter.variable}>
                    <Component {...pageProps} />
                </main>
            </ThemeProvider>
        </RecoilRoot>
    );
}

export default MyApp;
