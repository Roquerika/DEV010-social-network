import icono from '../assets/icono.png';
import { createUse, emailVerification, googleCount } from '../firebase/firebaseConfig.js';

function userRegister(navigateTo) {
  const section = document.createElement('section');
  const icon = document.createElement('img');
  const title = document.createElement('h2');
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonRegister = document.createElement('button');
  const buttonSingUpWithGoogle = document.createElement('button');
  inputPass.setAttribute('type', 'password');
  inputEmail.setAttribute('type', 'email');

  buttonSingUpWithGoogle.setAttribute('type', 'submit');
  const textLogin = document.createElement('span');
  const linkLogin = document.createElement('span');

  section.id = 'registerSection';
  icon.src = icono;
  icon.alt = 'New Wave Icon';
  icon.classList.add('icon');
  title.classList.add('titles');
  form.id = 'registerForm';
  inputName.classList.add('input');
  inputEmail.classList.add('input');
  inputPass.classList.add('input');
  buttonRegister.id = 'btnLogin';
  textLogin.classList.add('text');
  linkLogin.classList.add('link');
  buttonSingUpWithGoogle.classList.add('googleButton');
  buttonSingUpWithGoogle.id = 'btnGoogle';

  title.textContent = 'CREA TU CUENTA:';
  buttonRegister.textContent = 'REGISTRARSE';

  inputName.placeholder = 'Tu nombre';
  inputEmail.placeholder = 'Correo electrónico';
  inputPass.placeholder = 'Contraseña';

  // Signing users
  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();

    // const userName = inputName.value;
    const email = inputEmail.value;
    const password = inputPass.value;

    createUse(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        emailVerification(user).then(() => {
          console.log('Verificando email');
          // alert('Correo de verificación enviado');
        });
        // form.requestFullscreen();
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    googleCount()
      .then(() => {
        navigateTo('/feed');
      });
  });

  // Link a Login
  textLogin.textContent = 'Si ya tienes una cuenta ';
  linkLogin.textContent = 'INGRESA AQUÍ';
  linkLogin.addEventListener('click', () => {
    navigateTo('/login');
  });

  form.append(inputName, inputEmail, inputPass, buttonRegister, buttonSingUpWithGoogle);
  section.append(icon, title, form, textLogin, linkLogin);

  return section;
}

export default userRegister;
