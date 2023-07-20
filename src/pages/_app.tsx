import type {AppProps} from 'next/app';
import {Noto_Sans_KR, Roboto} from 'next/font/google';
import '@/styles/global.css';
import {ThemeProvider} from "@mui/system";
import theme from "../../style.theme";
import {RecoilRoot} from "recoil";
import {AuthProvider} from "@/@core/context/AuthContext";
import {ReactNode} from "react";
import GuestGuard from "@/@core/components/auth/GuestGuard";
import AuthGuard from "@/@core/components/auth/AuthGuard";
import {NextPage} from "next";
import {EmotionCache} from "@emotion/react";
import Spinner from "@/@core/components/spinner";
import {SnackbarProvider} from "notistack";

type GuardProps = {
    authGuard: boolean
    guestGuard: boolean
    children: ReactNode
}

const notoSansKr = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['100', '400', '700', '900'],
})

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
    variable: '--roboto',
})

type ExtendedAppProps = AppProps & {
    Component: NextPage
    emotionCache: EmotionCache
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
    if (guestGuard) {
        return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
    } else if (!guestGuard && !authGuard) {
        return <>{children}</>
    } else {
        return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
    }
}

function App(props: ExtendedAppProps) {
    const { Component, pageProps } = props;

    const authGuard = Component.authGuard ?? true;
    const guestGuard = Component.guestGuard ?? false;

    return (
        <RecoilRoot>
            <SnackbarProvider>
                <AuthProvider>
                    <Guard authGuard={authGuard} guestGuard={guestGuard}>
                        <ThemeProvider theme={theme}>
                            <main className={[notoSansKr.className, roboto.variable].join(' ')}>
                                <Component {...pageProps} />
                            </main>
                        </ThemeProvider>
                    </Guard>
                </AuthProvider>
            </SnackbarProvider>
        </RecoilRoot>
    );
}

export default App;
