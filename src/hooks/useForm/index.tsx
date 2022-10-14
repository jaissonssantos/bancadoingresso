import { useCallback, useState } from 'react';
import { useStateWithRef } from '../useStateWithRef';

type Value = any;
type ValidatorResult = boolean | string;
type FormData = Record<string, Value>;

export type Validator<T = FormData> = (
  value: Value,
  formData: T,
) => ValidatorResult;

type Formatter = (value: Value) => string;
type FormErrors<T> = {
  [key in keyof T]?: string[] | undefined;
};

interface UseFormOptions<T> {
  initialData: T;
  validators?: {
    [key in keyof T]?: Validator<T>[];
  };
  formatters?: { [key in keyof T]?: Formatter };
}

interface isFormValidParams {
  updateErrorsState?: boolean;
}

export interface UseFormReturn<T = FormData> {
  formData: T;
  formErrors: FormErrors<T>;
  onChangeInput: <N extends keyof T, V extends Value>(
    name: N,
    value: V,
  ) => void;
  isFormValid: (params?: isFormValidParams) => boolean;
  setErrors: (errors: FormErrors<T>) => void;
}

export const useForm = <T extends FormData>({
  initialData,
  validators,
  formatters,
}: UseFormOptions<T>): UseFormReturn<T> => {
  const [formData, setFormData, formDataRef] = useStateWithRef<T>(initialData);
  const [formErrors, setFormErrors] = useState<FormErrors<T>>({});

  const runValidator = (name: keyof T, value: Value): ValidatorResult[] =>
    (validators?.[name] ?? [])
      .map(validator => validator(value, formDataRef.current))
      .filter(Boolean);

  const runAllValidators = (): FormErrors<T> =>
    Object.keys(validators ?? {}).reduce(
      (errors, name) => ({
        ...errors,
        [name]: runValidator(name, formData[name]),
      }),
      {},
    );

  const onChangeInput = useCallback((name: keyof T, value: Value): void => {
    const inputFormatter = formatters?.[name];
    const formattedValue = inputFormatter ? inputFormatter(value) : value;

    const validatorsResult = runValidator(name, formattedValue);

    if (validatorsResult.length === 0) {
      setFormErrors(errors => ({ ...errors, [name]: validatorsResult }));
    }

    setFormData(currData => ({ ...currData, [name]: formattedValue }));
  }, []);

  const isFormValid = ({
    updateErrorsState = true,
  }: isFormValidParams = {}): boolean => {
    const errors = runAllValidators();
    const errorsList = Object.values(errors).filter(
      errorList => errorList && errorList.length > 0,
    );

    if (updateErrorsState) {
      setFormErrors(errors);
    }

    return errorsList.length === 0;
  };

  const setErrors = (errors: FormErrors<T>): void =>
    setFormErrors(currErrors => ({ ...currErrors, ...errors }));

  return { formData, formErrors, onChangeInput, isFormValid, setErrors };
};
