import {ReactElement, ReactNode, useEffect} from "react";
import {useAuth} from "@/@core/hooks/useAuth";
import {useRouter} from "next/router";
import Storage from "@/@core/utils/StorageUtil";

interface AuthGuardProps {
    children: ReactNode;
    fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
    const { children, fallback } = props;
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;

        if (auth.jwt === null && !Storage.hasItem('jwt')) {
            if (router.asPath !== '/') {
                router.replace({
                    pathname: '/auth/login',
                    query: { returnUrl: router.asPath }
                });
            } else {
                router.replace('/auth/login');
            }
        }
    }, [router.route]);

    if (auth.loading || auth.jwt === null) {
        return fallback;
    }

    return <>{children}</>
}

export default AuthGuard;
