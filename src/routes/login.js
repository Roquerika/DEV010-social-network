import {
  signIn, resetEmail, signinGoogle,
} from '../firebase/firebaseConfig.js';

function login(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const textRegister = document.createElement('span');
  const linkRegister = document.createElement('span');
  const linkResetEmail = document.createElement('span');
  const buttonLogInWithGoogle = document.createElement('button');
  buttonLogInWithGoogle.setAttribute('type', 'button');

  inputEmail.placeholder = 'Correo electrónico';
  inputPass.placeholder = 'Contraseña';

  title.textContent = 'Ingresa a tu cuenta:';
  buttonLogin.textContent = 'ENTRAR';

  // Login users
  buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();

    const email = inputEmail.value;
    const password = inputPass.value;

    signIn(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        alert('Acceso exitoso');
        navigateTo('/feed');
      // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorCode);
      });
  });

  // Signin con Google
  buttonLogInWithGoogle.textContent = 'ENTRAR CON GOOGLE';
  buttonLogInWithGoogle.addEventListener('click', () => {
    then(result => {
      console.log('hola')
    })
    .catch(err => {
      console.log(error)
    })
    //signinGoogle();
    //navigateTo('/feed');
  });

  // Link para registrarse
  textRegister.textContent = 'Si aún no tienes cuenta regístrate ';
  linkRegister.textContent = 'AQUÍ';
  linkRegister.addEventListener('click', () => {
    navigateTo('/userRegister');
  });

  // Recuperar contraseña
  linkResetEmail.textContent = '¿Olvidaste tu contraseña?';
  linkResetEmail.addEventListener('click', (e) => {
    e.preventDefault();

    const email = inputEmail.value;

    resetEmail(email)
      .then(() => {
      // Password reset email sent
        console.log('Email enviado');
        alert('Email enviado');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorCode);
      });
  });

  buttonReturn.textContent = 'Regresar';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  form.append(inputEmail, inputPass, buttonLogin, buttonLogInWithGoogle);
  section.append(title, form, buttonReturn, textRegister, linkRegister, linkResetEmail);

  return section;
}

export default login;
