import logoVerticalBlanco from '../assets/logoVerticalBlanco.png';

function home(navigateTo) {
  const section = document.createElement('section');
  const imgHome = document.createElement('img');
  const button = document.createElement('button');

  section.id = 'homeSection';
  button.id = 'btnHome';
  imgHome.src = logoVerticalBlanco;
  imgHome.alt = 'New Wave Logo';
  imgHome.classList.add('imgHome');

  button.textContent = 'EMPEZAR';
  button.addEventListener('click', () => {
    navigateTo('/login');
  });

  section.append(imgHome, button);
  return section;
}

export default home;
