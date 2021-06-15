const nombre = document.getElementById('nombre');
const numeroPaginas = document.getElementById('pagina');
const numeroRepos = document.getElementById('repoPagina');
const btnEnviar = document.getElementById('btn');
const resultado = document.getElementById('resultado');

const URL = 'https://api.github.com/users'

const request = async(user, repos) => {
    try {
        const usuario = await user;
        const repositorios = await repos;
        return Promise.all([usuario, repositorios]);
        //return { usuario, repositorios }
    } catch (error) {
        console.log(error);
        return error;
    }
}
const getUser = async(user) => {
    try {
        const response = await fetch(`${URL}/${user}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(object);
        return error;
    }

}
const getRepo = async(username, pages, repos) => {
    try {
        const response = await fetch(`${URL}/${username}/repos?page=${pages}&per_page=${repos}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}



btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();
    request(getUser(nombre.value), getRepo(nombre.value, numeroPaginas.value, numeroRepos.value)).
    then(res => {
        console.log(res);
    })
})