import Toast from 'typescript-toastify';
import type { ToastType } from 'typescript-toastify';
export type ToastType = "info" | "success" | "warning" | "error" | "default";
    
export const commonFunctions = {
    getTotalPages (items: number, limit: number) {
        return Math.ceil(items/limit)
    },

    getPageNumbersArray (items: number, limit: number) {
        return [...Array(Math.ceil(items/limit)).keys()].map(x => ++x);
    },

    getDropdownYears() {
        const tempYears: Array<{ key: string; value: number }> = [];
        const now                                              = new Date();

        for (let year = 2016; year <= now.getFullYear(); year++) {
            const item = {
                key   : String(year),
                value : year
            };
            tempYears.push(item);
        }

        return tempYears
    },

    toast(messageType: ToastType, message: string) {
        return  new Toast({
            position: "bottom-right",
            toastMsg: `🦚 ${message}`,
            autoCloseTime: 2000,
            canClose: true,
            showProgress: true,
            pauseOnHover: true,
            pauseOnFocusLoss: true,
            type: messageType,
            theme: "light"
        });
    }
};