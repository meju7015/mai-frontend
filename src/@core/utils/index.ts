import {useCallback} from "react";

export const toFileSize = (size: number) => {
    const bytes = ['KB', 'MB', 'GB', 'TB'];

    for (let i = 0; i < bytes.length; i++) {
        size = Math.floor(size / 1024);
        if (size < 1024) return size.toFixed(1) + bytes[i];
    }
}

export const checkExtension = (file: File, type: string) => {
    console.log(file);
    return file.type === type;
}

export const checkFileSize = (file: File) => {
    return file.size > 0;
}

export const urlCheck = (url: string) => {
    const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return pattern.test(url);
}

export const getEnv = <T>(key: string, defaultValue?: T) => {
    return process.env[key] || (defaultValue || '');
}
