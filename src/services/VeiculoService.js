import baseUrl from "../config/environment";

const VeiculoService = {
  cadastrar(veiculo) {
    return fetch(`${baseUrl}/veiculos`, {
      method: "POST",
      body: JSON.stringify(veiculo),
    }).then((r) => r.json());
  },

  alterar(veiculo) {
    return fetch(`${baseUrl}/veiculos` + veiculo.id, {
      method: "PUT",
      body: JSON.stringify(veiculo),
    }).then((r) => r.json());
  },

  consultar(id) {
    return fetch(`${baseUrl}/veiculos` + id).then((r) => r.json());
  },

  listar() {
    return fetch(`${baseUrl}/veiculos`).then((r) => r.json());
  },

  excluir(veiculo) {
    return fetch(`${baseUrl}/veiculos` + veiculo.id, {
      method: "DELETE",
    }).then((r) => r.json());
  },

  excluir(veiculo) {
    return fetch(`${baseUrl}/veiculos/` + veiculo.id, {
      method: "DELETE",
    }).then((r) => r.json());
  },
};

export default VeiculoService;
