import type { Validator } from 'src/hooks/useForm';
import { isValid as isValidCpf } from './cpf';
import { isValid as isCPFOrCNPJ } from './cpfCnpj';

export const required: Validator = value =>
  value ? false : 'Campo deve ser preenchido';

export const cpf: Validator = value => {
  const valid = isValidCpf(value);

  return valid ? false : 'CPF inválido';
};

export const cpforcnpj: Validator = value => {
  const valid = isCPFOrCNPJ(value);

  return valid ? false : 'CPF/CNPJ inválido';
};

export const hasPasswordOnlyNumberCharacteres: Validator = value => {
  const rawValue = value.replace(/[^0-9a-zA-Z]/g, '');
  const onlyMixOfAlphaNumeric =
    /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;

  if (onlyMixOfAlphaNumeric.test(rawValue)) {
    return false;
  }
  return 'Sua senha deve conter ao menos uma letra e um número.';
};
