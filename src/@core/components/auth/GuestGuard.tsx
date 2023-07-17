import {ReactElement, ReactNode, useEffect} from "react";
import {useAuth} from "@/@core/hooks/useAuth";
import {useRouter} from "next/router";
import Storage from "@/@core/utils/StorageUtil";
import {authConfig} from "@/@core/config/authConfig";

interface GuestGuardProps {
    children: ReactNode;
    fallback: ReactElement | null;
}

const GuestGuard = (props: GuestGuardProps) => {
    const { children, fallback } = props;
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;

        if (Storage.hasItem(authConfig.storageTokenKeyName)) {
            router.replace('/');
        }
    }, [router.route])

    if (auth.loading || (!auth.loading && auth.jwt !== null)) {
        return fallback;
    }

    return <>{children}</>
}

export default GuestGuard;
