import {
  collection, onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
// import {auth} from '../lib/index';

import iconoNav from '../assets/iconoBlanco.png';
import iconoCerrar from '../assets/iconos/icono-cerrar.png';
import generalUser from '../assets/general-user.png';

// Crear una card que contenga cada post
function createPostCard(data) {
  const card = document.createElement('div');
  card.classList.add('post-card');
  const userNameElement = document.createElement('h3');
  userNameElement.classList.add('user-name');
  userNameElement.textContent = data.userName;
  const pictureUser = document.createElement('img');
  pictureUser.classList.add('user-img');
  // pictureUser.src = auth.currentUser.photoURL ? auth.currentUser.photoURL :
  // '../src/assets/person_FILL1_wght400_GRAD0_opsz24.png';
  pictureUser.src = data.avatar || generalUser;
  const contentElement = document.createElement('p');
  contentElement.classList.add('post');
  contentElement.textContent = data.content;
  const dateElement = document.createElement('p');
  dateElement.classList.add('date');
  const date = data.createdAt.toDate();
  dateElement.textContent = `${date.toLocaleDateString()}`;
  card.append(pictureUser, userNameElement, dateElement, contentElement);
  return card;
}

// Cargar posts de Firestore
function loadPosts(muro) {
  const postsCollection = collection(db, 'posts');
  onSnapshot(postsCollection, (querySnapshot) => {
    muro.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const data = doc.data(); // Transforma objeto de Firebase a objeto de JS
      console.log(data.userID);
      const postCard = createPostCard({ ...data, id: doc.id });
      muro.appendChild(postCard);
    });
  });
}

function feed(navigateTo) {
  const section = document.createElement('section');

  const header = document.createElement('div');
  const name = document.createElement('h3');
  const profileName = document.createElement('h4');
  const pictureUser = document.createElement('img');
  const textSignoff = document.createElement('span');
  const buttonSignoff = document.createElement('img');

  const main = document.createElement('main');

  const postContainer = document.createElement('div');
  const postTitle = document.createElement('p');
  const muro = document.createElement('div');

  const nav = document.createElement('nav');
  const menuContainer = document.createElement('div');
  const buttonHome = document.createElement('button');
  const buttonLikes = document.createElement('button');
  const iconElement = document.createElement('img');
  const buttonPosts = document.createElement('button');
  const buttonProfile = document.createElement('button');

  section.id = 'feedSection';
  header.id = 'header';
  name.classList.add('userName');
  profileName.classList.add('profileName');
  pictureUser.classList.add('pictureUser');
  main.id = 'main';
  postContainer.id = 'postContainer';
  postTitle.classList.add('titles');

  menuContainer.id = 'navbar';
  buttonHome.classList.add('btnNav');
  buttonLikes.classList.add('btnNav');
  buttonPosts.classList.add('btnNav');
  buttonProfile.classList.add('btnNav');
  iconElement.src = iconoNav;
  iconElement.alt = 'New Wave Icon';
  iconElement.classList.add('iconNav');

  // const usuaria = auth.currentUser;
  // console.log(usuaria);
  name.textContent = 'NOMBRE USUARIA'; /* `${data.userName}` auth.currentUser.displayName */
  profileName.textContent = '@nombreperfil';
  pictureUser.src = generalUser;

  postTitle.textContent = 'LO QUE SE DICE EN NEW WAVE:';

  textSignoff.textContent = 'Cerrar sesión';
  textSignoff.classList.add('specialText');
  buttonSignoff.src = iconoCerrar;
  buttonSignoff.classList.add('buttonSignoff');
  buttonSignoff.addEventListener('click', () => {
    navigateTo('/login');
  });

  loadPosts(muro);

  // NAV BAR
  buttonHome.textContent = 'Home';
  buttonHome.addEventListener('click', () => {
    navigateTo('/feed');
  });

  buttonLikes.textContent = 'Likes';
  buttonLikes.addEventListener('click', () => {
    navigateTo('/likes');
  });

  buttonPosts.textContent = 'Post';
  buttonPosts.addEventListener('click', () => {
    navigateTo('/posts');
  });

  buttonProfile.textContent = 'Profile';
  buttonProfile.addEventListener('click', () => {
    navigateTo('/profile');
  });

  // ORGANIZAR CONTENIDOS
  header.append(name, pictureUser, profileName, textSignoff, buttonSignoff);
  main.append(postContainer);
  postContainer.append(postTitle, muro);
  menuContainer.append(buttonHome, buttonLikes, iconElement, buttonPosts, buttonProfile);
  nav.appendChild(menuContainer);

  section.append(header, main, menuContainer);
  return section;
}

export default feed;
