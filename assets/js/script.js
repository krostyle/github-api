const nombre = document.getElementById('nombre');
const numeroPaginas = document.getElementById('pagina');
const numeroRepos = document.getElementById('repoPagina');
const btnEnviar = document.getElementById('btn');
const resultado = document.getElementById('resultados');

const URL = 'https://api.github.com/users'

const request = async(user, repos) => {
    try {
        const us = await user;
        const rep = await repos;
        const res = Promise.all([us, rep]).then(([usuarios, repositorios]) => {
            const resp = { usuarios, repositorios }
            return resp;
        }).catch(console.error);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const getUser = async(user) => {
    try {
        const response = await fetch(`${URL}/${user}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }

}
const getRepo = async(username, pages, repos) => {
    try {
        const response = await fetch(`${URL}/${username}/repos?page=${pages}&per_page=${repos}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



btnEnviar.addEventListener('click', async(e) => {
    e.preventDefault();

    const data = await request(getUser(nombre.value), getRepo(nombre.value, numeroPaginas.value, numeroRepos.value)).then(res => {
        return res
    })
    console.log(data);
    if (data.usuarios.message === "Not Found") {
        alert('Not Found')
    } else {
        createInfo(data);
    }
})


const createInfo = (data) => {
    const usuario = data.usuarios;
    const repositorio = data.repositorios
    resultado.innerHTML = '';
    resultado.innerHTML =
        /*HTML*/
        `<div class="col-12 col-sm-6">
            <img src="${usuario.avatar_url}" class="img-fluid">
            <h2>Datos del usuario</h2>
            <p>Nombre de usuario: ${usuario.name}</p>
            <p>Nombre de login: ${usuario.login}</p>
            <p>Cantidad de repositorios: ${usuario.public_repos}</p>
            <p>Localidad: ${usuario.location}</p>
            <p>Tipo de usuario: ${usuario.type}</p>
        </div>`

    resultado.innerHTML +=
        /*HTML */
        `<div class="col-12 col-sm-6 text-right">
            <h2>Nombre de repositorios</h2>
            <ul class="list-group list-group-flush" id="list"></ul>
        </div>
        `;
    repositorio.forEach(e => {
        const list = document.getElementById('list')
        list.innerHTML +=
            /*HTML */
            `
            <li class="list-group-item"><a href='${e.html_url}'>${e.name}</a></li>
            `
    })
}