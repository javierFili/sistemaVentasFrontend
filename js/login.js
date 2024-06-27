const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
let perfil = localStorage.getItem('usuario') != null ? JSON.parse(localStorage.getItem('usuario')) : {};
const validar = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    if (email != "" && password != "") {
        if (email === perfil.email && password === perfil.password) {
            localStorage.setItem('sesionIniciada', 'SI');
            successConfirmation('Sesion iniciada correctamente', 'dashboard.html');
        } else {
            warning('Email o password no validos');
        }
    } else {
        danger('No puede enviar datos vacíos');
    }
}
const crearUsuario = () => {
    let email = document.getElementById('newEmail').value;
    let password = document.getElementById('newPassword').value;
    let usuario = document.getElementById('newUsuario').value;
    if (email != "" && password != "" && usuario != "") {
        let objeto = {
            nombre: usuario,
            apellido: '',
            usuario,
            email,
            password
        }
        localStorage.setItem('usuario', JSON.stringify(objeto));
        localStorage.setItem('sesionIniciada', 'SI');
        successConfirmation('Sesion iniciada correctamente', 'ver-perfil.html');
    } else {
        danger('No puede enviar datos vacíos');
    }
}