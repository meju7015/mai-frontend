import {useRouter} from "next/router";

function useRouteParams<T> () {
    const router = useRouter();
    const {query} = router;
    return query as T;
}
export default useRouteParams;
