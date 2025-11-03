import Toast from 'typescript-toastify';
import type { ToastType } from 'typescript-toastify/lib/type/type';

// ToastType values
// "info",
// "success",
// "warning",
// "error",
// "default"

export const toast = (messageType: ToastType, message: string) => {
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