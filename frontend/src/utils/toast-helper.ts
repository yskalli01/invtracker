import { toast, ToastOptions } from 'react-toastify';
type ToastType = 'success' | 'error' | 'info' | 'warn' | 'warning' | 'dark';

const defaultToastOptions: ToastOptions = {
  autoClose: 5000,
  position: 'top-right',
};

// We use the message string as a unique toastId to prevent duplicates
export function notify(message: string, type: ToastType = 'info') {
  toast[type](message, {
    ...defaultToastOptions,
    toastId: message,
  });
}

