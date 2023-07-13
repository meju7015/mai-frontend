import useRouteParams from "@/@core/hooks/useRouteParams";
import {useRecoilState} from "recoil";
import {authUserState} from "@/pages/auth/store/atoms";
import {useEffect} from "react";
import {GetServerSideProps} from "next";

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
    //** store
    const [authUser, setAuthUser] = useRecoilState(authUserState);

    //** Effect
    useEffect(() => {
        if (props.jwt) setAuthUser(props);
    }, [])

    return <div>
        <pre>
            {JSON.stringify(authUser)}
        </pre>
    </div>;
}

export default GoogleCallback
