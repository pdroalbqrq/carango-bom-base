import baseUrl from "../config/environment";
import { header, handleResponse } from "../utils/http-handlers";
const MarcaService = {
  cadastrar(marca) {
    return fetch(`${baseUrl}/marcas`, {
      method: "POST",
      body: JSON.stringify(marca),
      headers: header(),
    }).then((r) => r.json());
  },

  alterar(marca) {
    return fetch(`${baseUrl}/marcas/` + marca.id, {
      method: "PUT",
      body: JSON.stringify(marca),
      headers: header(),
    }).then((r) => r.json());
  },

  consultar(id) {
    return fetch(`${baseUrl}/marcas/` + id, {
      headers: header(),
    }).then((r) => r.json());
  },

  listar() {
    return fetch(`${baseUrl}/marcas`, {
      headers: header(),
    }).then((r) => handleResponse(r));
  },

  excluir(marca) {
    // console.log(marca);
    return fetch(`${baseUrl}/marcas/` + marca.id, {
      method: "DELETE",
      headers: header(true),
    }).then((r) => r);
  },
};

export default MarcaService;
