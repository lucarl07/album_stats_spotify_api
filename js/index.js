// Declare button variables:
const btnLogin = document.getElementById('btnLogin'),
btnRegister = document.getElementById('btnRegister');

// Go to ./pages/login.html:
btnLogin.addEventListener('click', () => {
    window.location.href = './pages/login.html';
})

// Go to ./pages/register.html:
btnRegister.addEventListener('click', () => {
    window.location.href = './pages/register.html';
})