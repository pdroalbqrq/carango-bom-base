import baseUrl from "../config/environment";
import { header } from "../utils/http-header";

const UsuarioService = {
  cadastrar(usuario) {
    return fetch(`${baseUrl}/usuarios`, {
      method: "POST",
      body: JSON.stringify(usuario),
      headers: header(),
    }).then((r) => r.json());
  },

  autenticar(usuario) {
    return fetch(`${baseUrl}/auth`, {
      method: "POST",
      body: JSON.stringify(usuario),
      headers: header(),
    })
      .then((r) => r.json())
      .then((r) => {
        localStorage.setItem("jwt", `${r.type} ${r.token}`);
        return r;
      });
  },

  alterar(usuario) {
    return fetch(`${baseUrl}/usuarios/` + usuario.id, {
      method: "PUT",
      body: JSON.stringify(usuario),
      headers: header(),
    }).then((r) => r.json());
  },

  consultar(id) {
    return fetch(`${baseUrl}/usuarios/` + id, { headers: header() }).then((r) =>
      r.json()
    );
  },

  listar() {
    return fetch(`${baseUrl}/usuarios`, { headers: header() }).then((r) =>
      r.json()
    );
  },

  excluir(usuario) {
    return fetch(`${baseUrl}/usuarios/` + usuario.id, {
      method: "DELETE",
      headers: header(true),
    }).then((r) => r.json());
  },
};

export default UsuarioService;
