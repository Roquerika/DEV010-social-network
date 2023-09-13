// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';

// Importamos los archivos js que permitirán la visualización
import home from './routes/home.js';
import login from './routes/login.js';
import signin from './routes/userRegister.js';
import error from './routes/error.js';

myFunction();

// Crear una variable con arreglo de objetos para tener ruta e identificar a qué eemento pertenece
const routes = [
  { path: '/', component: home },
  { path: '/login', component: login },
  { path: '/userRegister', component: signin },
  { path: '/error', component: error },
];

// Definir ruta por defecto
const defaultRoute = '/';
const root = document.getElementById('root');

// Crear variable que acceda al nodo con id=root donde se renderizara la información
function navigateTo(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);

  // Crear función para navegar entre rutas
  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path, // Agrega registro al historial de navegación
    );

    // Si hay un elemento previamente renderizado lo vamos a quitar
    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    // Insertar nuevo elemento con propiedad component
    root.appendChild(route.component(navigateTo));
  } else { // Si la ruta ingresada es undefined nos manda una ruta vaida creada por nosotras
    navigateTo('/error');
  }
}

// Para regresar a la ruta anterior desde nuestro navegador usando onpopstate
window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

// Invocamos a la función con un argumento con la ruta o la ruta por defecto
navigateTo(window.location.pathname || defaultRoute);
