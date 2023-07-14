import type {AppProps} from 'next/app';
import {Inter} from 'next/font/google';
import '@/styles/global.css';
import {ThemeProvider} from "@mui/system";
import theme from "../../style.theme";
import {RecoilRoot} from "recoil";
import { Roboto, Noto_Sans_KR } from 'next/font/google';

const notoSansKr = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['100', '400', '700', '900'],
})

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
    variable: '--roboto',
})

function MyApp({Component, pageProps}: AppProps) {
    return (
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <main className={[notoSansKr.className, roboto.variable].join('')}>
                    <Component {...pageProps} />
                </main>
            </ThemeProvider>
        </RecoilRoot>
    );
}

export default MyApp;
