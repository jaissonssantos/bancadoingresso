/* eslint-disable no-useless-escape */
// unmasked (api view): 33307382861
// masked (user view): 333.073.828-61
import { isCPF, formatToCPF } from 'brazilian-values';

const isValid = (cpf: string): boolean => {
  const regex = /^(\d{0,3})\.(\d{0,3})\.(\d{0,3})\-(\d{0,2})?$/;
  if (!regex.test(cpf)) {
    return false;
  }
  return isCPF(cpf);
};

const unmask = (value: string): string => value.replace(/\D/g, '');

const updateMask = formatToCPF;

export { isValid, unmask, updateMask };
