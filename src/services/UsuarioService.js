// import baseUrl from "../config/environment";

let users = [
  {
    id: 1,
    nome: "Pedro",
  },
  {
    id: 2,
    nome: "Diego",
  },
  {
    id: 3,
    nome: "José",
  },
];
const UsuarioService = {
  cadastrar(usuario) {
    users.push(usuario);
    // return fetch(`${baseUrl}/usuarios/`, {
    //   method: "POST",
    //   body: JSON.stringify(usuario),
    // }).then((r) => r.json());
  },

  alterar(usuario) {
    // return fetch(`${baseUrl}/usuarios/` + usuario.id, {
    //   method: "PUT",
    //   body: JSON.stringify(usuario),
    // }).then((r) => r.json());
  },

  consultar(id) {
    const foundUser = users.find((user) => +user.id === +id);

    return Promise.resolve(foundUser).then((r) => r);
    // return fetch(`${baseUrl}/usuarios/` + id).then((r) => r.json());
  },

  listar() {
    return Promise.resolve(users).then((r) => r);
    // return fetch(`${baseUrl}/usuarios/`).then((r) => {
    //   console.log(r);
    //   return r.json();
    // });
  },

  excluir(usuario) {
    users = users.filter((user) => +user.id !== +usuario.id);

    return Promise.resolve(users).then((r) => r);
    // return fetch(`${baseUrl}/usuarios/` + usuario.id, {
    //   method: "DELETE",
    // }).then((r) => r.json());
  },
};

export default UsuarioService;
