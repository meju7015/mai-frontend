import {useSnackbar} from "notistack";

const useToast = () => {
    const { enqueueSnackbar } = useSnackbar();

    const toast = (message: string, variant: "success" | "error" | "warning" | "info" = "success") => {
        enqueueSnackbar(message, { variant, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
    }

    return {
        toast
    };
}

export default useToast;
