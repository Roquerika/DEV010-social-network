import login from '../src/routes/login';
import { googleCount, resetEmail, signIn } from '../src/firebase/firebaseConfig';

jest.mock('../src/firebase/firebaseConfig', () => ({
  signIn: jest.fn(),
  googleCount: jest.fn(),
  resetEmail: jest.fn(),
}));

describe('login', () => {
  let component;

  it('debería ser una función', () => {
    expect(typeof login).toBe('function');
  });

  it('debería crear los elementos botón y linkLogin en la sección', () => {
    const resultado = login(() => {});
    const buttonLogin = resultado.querySelector('button');
    const linkUserRegister = resultado.querySelector('.link');

    // Verifica que los elementos existan y tengan el contenido esperado
    expect(buttonLogin).toBeTruthy();
    expect(linkUserRegister).toBeTruthy();
    expect(resultado.tagName).toBe('SECTION');
    expect(buttonLogin.textContent).toBe('ENTRAR');
  });

  it('Dando click al botón ENTRAR debe dirigirse a /feed', async () => {
    // Crea un mock para la función navigateTo
    const mockNavigateTo = jest.fn();
    signIn.mockResolvedValue({ user: {/* Cuenta simulación */} });
    // Define una función simulada para navigateTo que almacene la ruta a la que se dirigió.
    component = login(mockNavigateTo);

    // Encuentra el elemento btnlogin dentro del componente
    const btnlogin = component.querySelector('#btnLogin');

    btnlogin.click();

    // Espera a que se resuelva la promesa de signIn
    await Promise.resolve();

    expect(mockNavigateTo).toHaveBeenCalledWith('/feed');
  });

  // Verifica el registro con Google
  it('debería redirigir a /feed después de hacer clic en el botón de registro con Google y verifica que se llame la función googleCount', async () => {
    // Crea un mock para la función navigateTo
    const mockNavigateTo = jest.fn();
    // Preparamos el mock
    googleCount.mockResolvedValue({ user: {} });
    // Crear un componente de registro de usuario pasando navigateTo
    component = login(mockNavigateTo);
    // Se asegura que el elemento este en el DOM
    document.body.appendChild(component);
    // Simular un clic en el botón de registro
    component.querySelector('#btnGoogle').click();
    // Esperar a que las promesas se resuelvan (puedes usar await o .then)
    await Promise.resolve();
    // Verificar que la función googleCount se haya llamado
    expect(googleCount).toHaveBeenCalled();
    // Verificar que navigateTo se haya llamado con la URL /feed
    expect(mockNavigateTo).toHaveBeenCalledWith('/feed');
  });

  it('Dando click al enlace "Aqui" debe dirigirse a /userRegister', () => {
    // Crea un mock para la función navigateTo
    const mockNavigateTo = jest.fn();
    // Crea el componente home llamando a la función mockNavigateTo
    component = login(mockNavigateTo);
    // Encuentra el link de registro dentro del componente
    const linkRegister = component.querySelector('.link');
    // Simula un clic en  el link de registro.
    linkRegister.click();
    // Verifica que la función navigateTo se haya llamado con la ruta correcta
    expect(mockNavigateTo).toHaveBeenCalledWith('/userRegister');
  });

  it('Dando click al link "¿Olvidaste tu contraseña?" debe llamar a resetEmail', async () => {
    resetEmail.mockResolvedValue({});

    document.body.appendChild(component);
    component.querySelector('.linkReset').click();
    expect(resetEmail).toHaveBeenCalled();
  });
});
