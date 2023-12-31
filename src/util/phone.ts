const codigosDDD = [
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35,
  37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 64, 63,
  65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88,
  89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
];

const iniciaisFixo = ['2', '3', '4', '5'];

export const parsePhone = (value: string): string | null => {
  if (value == null || typeof value !== 'string') {
    return null;
  }

  let telefone = value.replace(/\D/g, '');

  if (telefone.length === 12 || telefone.length === 13) {
    if (telefone.substring(0, 2) !== '55') {
      return null;
    }

    telefone = telefone.substring(2, telefone.length);
  }

  if (telefone.length < 10 || telefone.length > 11) {
    return null;
  }

  if (
    telefone.length === 11 &&
    (telefone.substring(2, 3) !== '9' || telefone.substring(3, 4) === '0')
  ) {
    return null;
  }

  if (
    telefone.length === 10 &&
    iniciaisFixo.indexOf(telefone.substring(2, 3)) === -1
  ) {
    return null;
  }

  const ddd = telefone.substring(0, 2);
  if (codigosDDD.indexOf(parseInt(ddd, 10)) === -1) {
    return null;
  }

  return telefone;
};
