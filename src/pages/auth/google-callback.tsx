import {useEffect} from "react";
import {GetServerSideProps} from "next/types";

export interface IGoogleCallbackParams {
    email: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
    jwt: string;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    return {
        props: {
            ...query
        }
    }
}

const GoogleCallback = (props: IGoogleCallbackParams) => {
    //** Effect
    useEffect(() => {
        window.opener.postMessage(props, window.location.origin);
    }, [])

    return <></>;
}

GoogleCallback.guestGuard = true;

export default GoogleCallback
