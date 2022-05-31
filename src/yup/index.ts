import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Campo requerido.',
  },
  string: {
    min: ({ min }) => `Debe contener al menos ${min} caracteres.`,
    max: ({ max }) => `Debe contener un máximo de ${max} caracteres.`,
    email: 'Correo electrónico invalido.',
  },
});
