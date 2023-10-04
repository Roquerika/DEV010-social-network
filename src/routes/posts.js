import {
  collection, addDoc, onSnapshot, getDocs, query,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import iconoNav from '../assets/iconoBlanco.png';
import generalUser from '../assets/general-user.png';
import onAuthStateChanged, { auth } from '../lib/index';

// const userLogin = localStorage.getItem('user');
// console.log(userLogin);

// Crear una card que contenga cada post
function createPostCard(data) { /* cambio de content por data */
  const card = document.createElement('div');
  card.classList.add('post-card');
  const userNameElement = document.createElement('h3');
  userNameElement.classList.add('user-name');
  userNameElement.textContent = data.userName;
  const contentElement = document.createElement('p');
  contentElement.classList.add('post');
  contentElement.textContent = data.content;
  const dateElement = document.createElement('p');
  dateElement.classList.add('date');
  const date = data.createdAt.toDate();
  const pictureUser = document.createElement('img');
  pictureUser.classList.add('user-img');
  pictureUser.src = data.avatar || generalUser;
  // Convierte fecha a una cadena legible
  // console.log('fecha de creación: ', date);
  dateElement.textContent = `${date.toLocaleDateString()}`;
  card.append(userNameElement, dateElement, contentElement, pictureUser);
  // console.log(card); /* muestra el contenido escrito en el posts */
  return card;
}

/*
  const photo = document.createElement('img');
  photo.src = avatar;
*/

// Cargar posts de Firestore
function loadPosts(myPosts) {
  const postsCollection = collection(db, 'posts');
  onSnapshot(postsCollection, (querySnapshot) => {
    myPosts.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const data = doc.data(); // Transforma objeto de Firebase a objeto de JS
      // console.log(data.userID);
      const postCard = createPostCard({ ...data, id: doc.id });
      myPosts.appendChild(postCard);
    });
  });
}

/*
function loadUserPosts(myPosts, userUid) {
  // const prueba = doc.data;
  // console.log(prueba);
  const user = auth.currentUser;
  if (user) {
    const userID = user.uid;
    console.log(userID);
    const postsCollection = collection(db, 'posts');

    // Realiza una consulta para obtener solo los posts del usuario actual
    const query = where('userID', '==', userID);

    onSnapshot(postsCollection, (querySnapshot) => {
      myPosts.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.userId === userUid) {
          const postCard = createPostCard({ ...data, id: doc.id });
          myPosts.appendChild(postCard);
        }
      });
    });
  }
}
loadUserPosts(); */

// Añadir un post a Firestore
function addPost({
  content,
}) {
  return new Promise((resolve, reject) => {
  // al resolver la promesa resolve indica que la promesa se resuelve correctamente,
  // reject  indica que la promesa ha sido rechazada

    /* const currentUser = auth.currentUser;
    if (!currentUser) {
      reject(new Error('El usuario no está autenticado.'));
      return;
    } */

    addDoc(collection(db, 'posts'), {
    // Añade un documento a la colección posts en la base de datos en firestore
    // El primer arg es la ref a post a partir de la bd y el segundo arg es un objeto
    // que contiene los datos del doc que agregaremos
      avatar: auth.currentUser.photoURL ? auth.currentUser.photoURL : 'urlimagengenerica',
      content,
      userID: auth.currentUser.uid,
      userName: auth.currentUser.displayName,
      createdAt: new Date(), // Fecha y hora de creación del post
      likesCount: 0, // likes en el post
      sharedCount: 0, // cuántas veces se compartió
    })
      .then((docRef) => {
        console.log('Publicación agregada con ID: ', docRef.id);
        resolve(docRef.id);
        console.log(collection);
      })
      .catch((error) => {
        console.error('Error al agregar la publicación: ', error);
        reject(error);
      });
  });
}

function posts(navigateTo) {
  const section = document.createElement('section');

  const header = document.createElement('div');
  const name = document.createElement('h3');
  const profileName = document.createElement('h4');
  const pictureUser = document.createElement('img');

  const main = document.createElement('main');

  const postContainer = document.createElement('div');
  const postTitle = document.createElement('p');
  const postInput = document.createElement('input');
  const buttonPost = document.createElement('button');

  const myPostsContainer = document.createElement('div');
  const myPostsTitle = document.createElement('p');
  const myPosts = document.createElement('div');

  const nav = document.createElement('nav');
  const menuContainer = document.createElement('div');
  const buttonHome = document.createElement('button');
  const buttonLikes = document.createElement('button');
  const iconElement = document.createElement('img');
  const buttonPosts = document.createElement('button');
  const buttonProfile = document.createElement('button');

  section.id = 'postsSection';
  header.id = 'header';
  name.classList.add('userName');
  profileName.classList.add('profileName');
  pictureUser.classList.add('pictureUser');
  main.id = 'main';
  postContainer.id = 'postContainer';
  postTitle.classList.add('titles');
  postInput.classList.add('inputPost');
  buttonPost.id = 'btnPost';

  myPostsContainer.id = 'myPostsContainer';
  myPostsTitle.classList.add('titles');

  menuContainer.id = 'navbar';
  buttonHome.classList.add('btnNav');
  buttonLikes.classList.add('btnNav');
  buttonPosts.classList.add('btnNav');
  buttonProfile.classList.add('btnNav');
  // buttonProfile.src = iconoProfile;
  iconElement.src = iconoNav;
  iconElement.alt = 'New Wave Icon';
  iconElement.classList.add('iconNav');

  name.textContent = 'NOMBRE USUARIA'; /* data.userName; auth.currentUser.displayName; `${data.userName}` */
  profileName.textContent = '@nombreperfil';
  pictureUser.src = generalUser;

  postTitle.textContent = 'CREAR UN POST:';
  postInput.placeholder = 'Escribe tu publicación aquí';
  buttonPost.textContent = 'POST';

  myPostsTitle.textContent = 'TUS POSTS:';

  // Llama a la función loadPosts y pásale myPosts como argumento
  // loadPosts(myPosts, auth.currentUser.uid);
  loadPosts(myPosts);

  buttonPost.addEventListener('click', () => {
    const content = postInput.value;
    if (content) {
      // Obtener datos del usuario actual
      // const currentUser = auth.currentUser;
      onAuthStateChanged();
      // Verificar si el usuario está autenticado y tiene los datos necesarios
      /* if (currentUser && currentUser.displayName && currentUser.photoURL) {
        const userName = currentUser.displayName;
        const avatar = currentUser.photoURL; */

      // Crea la tarjeta del post y agrega al contenedor de tus posts
      // createPostCard(content, userName, avatar, myPosts);
      // myPostsContainer.appendChild(postCard);

      addPost({
        avatar: auth.currentUser.photoURL ? auth.currentUser.photoURL : 'https://img.freepik.com/vector-gratis/ilustracion-icono-avatar-usuario_53876-5907.jpg?w=826&t=st=1695778431~exp=1695779031~hmac=d4122e27770a7ad67f3ab2561940aeaed1aefd69914d149cf76a9928d1f5bd8c',
        content,
        userID: 'ID_DEL_USUARIO',
        userName: 'Nombre de usuario',
      })
        .then((postId) => {
          // myPosts.innerHTML = '';
          console.log('Publicación agregada con ID: ', postId);
          // Borra el contenido del input después de publicar
          postInput.value = '';
        })
        .catch((error) => {
          console.error('Error al agregar la publicación: ', error);
        });
      // Crea la tarjeta del post y agrega al contenedor de tus posts
      // createPostCard(content, myPosts);
      // myPostsContainer.appendChild(postCard);
    }
  });

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
  header.append(name, pictureUser, profileName);
  main.append(postContainer, myPostsContainer);
  postContainer.append(postTitle, postInput, buttonPost);
  myPostsContainer.append(myPostsTitle, myPosts);
  menuContainer.append(buttonHome, buttonLikes, iconElement, buttonPosts, buttonProfile);
  nav.appendChild(menuContainer);

  section.append(header, main, menuContainer);
  return section;
}

export default posts;

// import useUser from "hookss/useUser"
// import AppLayout from "components/AppLayout"
// import Button from "components/AppLayouButton"
// import {useState} from 'react' 8.3K
// import {addDevit } from "src/firebaseConfig"
// {useRouter} from "next/router"

// const COMPOSE_SATATES ={
//   USER-nOT_KNOW:0,
//   lOADING: 0,
//   SUCCES: 1,
//   ERROR: -1,
// }

// export default function composeTweet(){
//   const [message, setMessage] = useState("")
//   const [status, setStatus] = useState(Compose_States.User_NOT_KNOWN)
//   const user =useUser()
//   const router = useRouter()

//   const handleChange = (event) => {
//     const {value} = event.target
//     setMessage(value)
//   }
//   const handleSubmit = (event) => {
//     event.preventDefault()
// setStatus(COMPOSE_STATES.LOADING)
//     addDevit({
//       avatar: user.avatar,
//       content: message,
//       userId: user.uid,
//       username: user.userName
// }).then(() =>{
//  router.push('/home')
// }.catch(err=>{
// console.error(err)
// setStatus(COMPOSE_STATES.ERROR)
// })

// const isButtonDisabled = !message.length || status = COMPOSE_STATES.LOADING
// return (
// <>
// <AppLayout>
//   <form onSubmit={handleSubmit}>
//     <textarea
// onChange={handleChange}
// placeholder="¿Qué está pasando?"
// value={message}></textarea>
//     <div>
//       <Button disabled={!message.length}>Devitear</Button>
//     </div>
//   </form>
// </AppLayout>)};

// export const fechLatestPots = () => {
//   return db.collection("posts")
//   .get()
//   .then((snapshot) => {
//     return snapshot.docs.map(doc => {
//       const data= doc.data()
//       const id = doc.id

//       return {
//         ... data,
//         id,
//       }
//     })
//   })
// }
