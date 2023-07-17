enum StorageType {
    LOCAL_STORAGE = 'localStorage',
    SESSION_STORAGE = 'sessionStorage'
}

export class StorageUtils {
    driver: StorageType;

    constructor(driver: StorageType) {
        this.driver = driver;
    }

    setItem(key: string, value: any) {
        if (typeof window !== 'undefined') {
            const currentValue = typeof value === 'object' ? JSON.stringify(value) : value;
            window[this.driver].setItem(key, currentValue)
        }
    }

    getItem(key: string) {
        if (typeof window !== 'undefined') {
            return window[this.driver].getItem(key) || undefined;
        }
    }

    hasItem(key: string) {
        if (typeof window !== 'undefined') {
            return !!window[this.driver].getItem(key);
        }
    }

    removeItem(key: string) {
        if (typeof window !== 'undefined') {
            window[this.driver].removeItem(key)
        }
    }
}

const Storage = new StorageUtils(StorageType.LOCAL_STORAGE)

export default Storage;
