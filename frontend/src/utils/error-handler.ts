import { isAxiosError } from "axios";
import { ERROR_MESSAGES } from "src/config/errorMessages";
import { Message } from 'src/types/message';
import {notify} from './toast-helper';

export function handleAxiosError(error: unknown, setMessage: (msg: Message) => void) {
  if (isAxiosError(error)) {
    if (!error.response) {
      // Network error (no response from server)
      setMessage({ type: 'error', text: ERROR_MESSAGES.NETWORK });
      return;
    }

    const status = error.response.status;
    const responseData = error.response.data;
    let errorMsg = '';

    if (status === 401) {
      errorMsg = ERROR_MESSAGES.UNAUTHORIZED;
    } 
    
    else if (status === 400) {
      // Validation errors
      if (Array.isArray(responseData?.errors)) {
        errorMsg = responseData.errors.map((e: { msg: any; }) => e.msg || JSON.stringify(e)).join(', ');
      } else if (typeof responseData?.errors === 'object') {
        errorMsg = Object.values(responseData.errors).join(', ');
      } else {
        errorMsg = ERROR_MESSAGES.VALIDATION;
      }
    } 

    else if(status === 500){
      errorMsg = responseData?.message || ERROR_MESSAGES.SERVER;
    }
    
    else {
      // Fallback for other server errors (e.g. 500)
      errorMsg =
        responseData?.message ||
        responseData?.error ||
        JSON.stringify(responseData || {});
    }

    setMessage({ type: 'error', text: errorMsg });
  } else if (error instanceof Error) {
    setMessage({ type: 'error', text: error.message });
  } else {
    setMessage({ type: 'error', text: 'An unknown error occurred.' });
  }
}

export function handleAxiosErrorInterceptor(error: unknown) {
  let errorMsg = '';
  // console.log(error);
  if (isAxiosError(error)) {
    if (!error.response) {
      errorMsg = ERROR_MESSAGES.NETWORK;
    } 
    
    else {
      const status = error.response.status;
      const responseData = error.response.data;

      if (status === 401) {
        errorMsg = ERROR_MESSAGES.UNAUTHORIZED;
      } 
      
      else if (status === 400) {
        if (Array.isArray(responseData?.errors)) {
          errorMsg = responseData.errors
            .map((e: { msg: any }) => e.msg || JSON.stringify(e))
            .join(', ');
        } 
        else if (typeof responseData?.errors === 'object') {
          errorMsg = Object.values(responseData.errors).join(', ');
        }
        else if(typeof responseData?.error === 'string'){
          errorMsg = responseData?.error;
        }
        else if(error?.message){
          errorMsg = error?.message;
        }
        else {
          errorMsg = ERROR_MESSAGES.VALIDATION;
        }
      } 
      
      else if (status === 500) {
        errorMsg = responseData?.message || ERROR_MESSAGES.SERVER;
      } 
      
      else {
        errorMsg =
          responseData?.message ||
          responseData?.error ||
          JSON.stringify(responseData || {});
      }
    }
  } 
  
  else if (error instanceof Error) {
    errorMsg = error.message;
  } 
  
  else {
    errorMsg = 'An unknown error occurred.';
  }

  // Use toastId to avoid duplicates:
  notify(errorMsg,'error');
}