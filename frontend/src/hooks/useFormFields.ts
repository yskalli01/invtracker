import { useCallback, useReducer } from 'react';

export const useFormFields = <T extends Record<string, any>>(initialValues: T) => {
  type Action = { field: keyof T; value: T[keyof T] };

  const reducer = (state: T, action: Action): T => {
    return {
      ...state,
      [action.field]: action.value,
    };
  };

  const [values, dispatch] = useReducer(reducer, initialValues);

  const setField = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      dispatch({ field, value });
    },
    []
  );

  const setFieldsFromObject = useCallback((data: Partial<T>) => {
    Object.entries(data).forEach(([key, value]) => {
      dispatch({ field: key as keyof T, value: value as T[keyof T] });
    });
  }, []);

  const resetFields = useCallback(() => {
    Object.entries(initialValues).forEach(([key, value]) => {
      dispatch({ field: key as keyof T, value: value as T[keyof T] });
    });
  }, [initialValues]);

  return {
    values,
    setField,
    setFieldsFromObject,
    resetFields,
  };
};
