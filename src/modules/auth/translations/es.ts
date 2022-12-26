export const authTranslationES = {
  code: 'Código',
  screens: {
    SignUp: {
      title: '¡Bienvenido!',
      subtitle: 'Completá tus datos y sumate a la gira',
      acceptThe: 'Acepto los ',
      terms: 'términos y condiciones',
    },
    SignIn: {
      title: '¡Hola de nuevo!',
      subtitle: '¿Volviste por mí o por qué extrañabas la joda?',
    },
    CodeGeneration: {
      title: 'Recuperar contraseña',
      subtitle:
        'Enviaremos un código a tu correo electrónico para que puedas acceder a tu cuenta',
      sendCode: 'Generar código',
      badEmail: 'El correo electrónico es incorrecto',
    },
    PasswordReset: {
      title: 'Recuperar contraseña',
      subtitle: 'Ingresá el código que recibiste y elegí tu nueva contrasena',
      changePassword: 'Cambiar contraseña',
      badCode: 'El código es incorrecto',
    },
  },
  components: {
    SignIn: {
      forgotPassword: '¿Olvidaste tu contraseña?',
      signIn: 'Iniciar sesión',
    },
    SignUp: {
      signUp: 'Comenzar',
    },
  },
} as const;
