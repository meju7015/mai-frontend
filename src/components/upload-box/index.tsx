import {Box, Container} from "@mui/system";
import {Grid} from "@mui/material";
import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";
import {checkExtension, checkFileSize, toFileSize} from "@/@core/utils";
import {createPdf} from "@/@core/api/asset-api";
import {useRouter} from "next/router";

interface IUploadBoxProps {}

interface IFileTypes {
    id: number;
    object: File;
}

const UploadBox = (props: IUploadBoxProps) => {
    //** hook
    const router = useRouter();

    // ** Refs
    const fileId = useRef<number>(0);
    const dragRef = useRef<HTMLDivElement | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);

    // ** States
    const [file, setFile] = useState<IFileTypes | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    // ** Methods
    const handleBeginDrag = useCallback((e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleEndDrag = useCallback((e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleOverDrag = useCallback((e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer!.files) {
            setIsDragging(true);
        }
    }, []);

    const onChangeFiles = useCallback(async (e: ChangeEvent<HTMLInputElement> | any) => {
        let selectedFiles: File;

        if (e.type === 'drop') {
            selectedFiles = e.dataTransfer.files[0];
        } else {
            selectedFiles = e.target.files[0];
        }

        if (!checkExtension(selectedFiles, 'application/pdf')) {
            alert('PDF 파일만 업로드 가능합니다.');
            return;
        }

        if (!checkFileSize(selectedFiles)) {
            alert('파일사이즈가 0인 파일은 업로드 할 수 없습니다.');
            return;
        }

        setFile({
            id: fileId.current++,
            object: selectedFiles,
        });

        const response = await createPdf(selectedFiles);

        if (response.statusCode === 201) {
            await goChat(response.data.namespace);
        } else {
            alert('파일 업로드에 실패했습니다.');
        }
    }, [file]);

    const goChat = (namespace: string) => router.push(`/chat/${namespace}`);

    const handleDialogOpen = useCallback(() => {
        if (fileRef.current !== null) {
            fileRef.current.click();
        }
    }, []);

    const handleDrop = useCallback((e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        onChangeFiles(e);
        setIsDragging(false);
    }, [onChangeFiles]);

    const initDragEvents = useCallback(() => {
        if (dragRef.current !== null) {
            dragRef.current?.addEventListener('dragenter', handleBeginDrag);
            dragRef.current?.addEventListener('dragleave', handleEndDrag);
            dragRef.current?.addEventListener('dragover', handleOverDrag);
            dragRef.current?.addEventListener('drop', handleDrop);
            dragRef.current?.addEventListener('click', handleDialogOpen);
        }
    }, [handleBeginDrag, handleEndDrag, handleOverDrag, handleDrop]);

    const resetDragEvents = useCallback(() => {
        if (dragRef.current !== null) {
            dragRef.current?.removeEventListener('dragenter', handleBeginDrag);
            dragRef.current?.removeEventListener('dragleave', handleEndDrag);
            dragRef.current?.removeEventListener('dragover', handleOverDrag);
            dragRef.current?.removeEventListener('drop', handleDrop);
            dragRef.current?.removeEventListener('click', handleDialogOpen);
        }
    }, [handleBeginDrag, handleEndDrag, handleOverDrag, handleDrop])

    // ** Effects
    useEffect(() => {
        initDragEvents();
        return () => resetDragEvents();
    }, [initDragEvents, resetDragEvents]);

    return (
        <>
            <input
                ref={fileRef}
                type='file'
                id='fileUpload'
                style={{display: 'none'}}
                multiple={false}
                onChange={onChangeFiles} />
            <Grid>
                <Box ref={dragRef} sx={[
                    styles.uploadBox,
                    isDragging && styles.dragging,
                    file && styles.uploading
                ]}>
                    <Box>
                        {
                            file
                            ? `${file.object.name} ${toFileSize(file.object.size)} 학습중 입니다..`
                            : `PDF 파일을 업로드 해주세요. 🎃`
                        }
                    </Box>
                </Box>

                <Box sx={{
                    textAlign: 'right',
                    color: 'gray'
                }}>
                    create by. mason.jeong
                </Box>
            </Grid>
        </>
    )
}

const styles = {
    description: {
        marginTop: 5,
    },
    uploadBox: {
        border: 3,
        padding: 5,
        marginTop: 2,
        borderRadius: 2,
        color: 'white',
        textAlign: 'center',
        borderStyle: 'dotted',
        bgcolor: 'primary.light',
        borderColor: 'primary.dark',
        transition: '0.2s all ease-in-out',
    },
    dragging: {
        bgcolor: 'primary.dark',
        borderColor: 'primary.light'
    },
    uploading: {
        bgcolor: 'secondary.main',
        borderColor: 'secondary.light',
    }
}

export default UploadBox
