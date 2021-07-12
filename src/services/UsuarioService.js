import baseUrl from "../config/environment";
import { header } from "../utils/http-handlers";

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
    return fetch(`${baseUrl}/usuarios`, {
      method: "PUT",
      body: JSON.stringify(usuario),
      headers: header(),
    }).then((r) => r);
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
    }).then((r) => r);
  },
};

export default UsuarioService;
