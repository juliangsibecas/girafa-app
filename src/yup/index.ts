import * as Yup from 'yup';

export const ErrorMessages = {
  required: 'Campo requerido.',
};

Yup.setLocale({
  mixed: {
    required: ErrorMessages.required,
  },
  string: {
    min: ({ min }) => `Debe contener al menos ${min} caracteres.`,
    max: ({ max }) => `Debe contener un máximo de ${max} caracteres.`,
    email: 'Correo electrónico invalido.',
  },
});
