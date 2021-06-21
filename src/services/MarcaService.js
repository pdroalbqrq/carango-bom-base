import baseUrl from "../config/environment";

const MarcaService = {
  cadastrar(marca) {
    return fetch(`${baseUrl}/marcas/`, {
      method: "POST",
      body: JSON.stringify(marca),
    }).then((r) => r.json());
  },

  alterar(marca) {
    return fetch(`${baseUrl}/marcas/` + marca.id, {
      method: "PUT",
      body: JSON.stringify(marca),
    }).then((r) => r.json());
  },

  consultar(id) {
    return fetch(`${baseUrl}/marcas/` + id).then((r) => r.json());
  },

  listar() {
    return fetch(`${baseUrl}/marcas/`).then((r) => r.json());
  },

  excluir(marca) {
    return fetch(`${baseUrl}/marcas/` + marca.id, {
      method: "DELETE",
    }).then((r) => r.json());
  },
};

export default MarcaService;
