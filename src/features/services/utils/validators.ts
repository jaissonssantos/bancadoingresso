import type { Validator } from 'src/hooks/useForm';
import { required } from 'src/util/validators';
import type { NewServiceFormData } from '../screens/NewService';

export const priceRequired: Validator<NewServiceFormData> = (value, formData) =>
  !formData?.isPriceOnRequest ? required(value, formData) : false;
