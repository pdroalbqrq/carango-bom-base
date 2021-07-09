import baseUrl from "../config/environment";
import { header, handleResponse } from "../utils/http-handlers";

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
      .then((r) => handleResponse(r))
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
    }).then((r) => handleResponse(r, false));
  },

  listar() {
    return fetch(`${baseUrl}/usuarios`, { headers: header() }).then((r) =>
      handleResponse(r)
    );
  },

  excluir(usuario) {
    return fetch(`${baseUrl}/usuarios/` + usuario.id, {
      method: "DELETE",
      headers: header(true),
    }).then((r) => handleResponse(r, false));
  },
};

export default UsuarioService;
