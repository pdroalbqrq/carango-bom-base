import baseUrl from "../config/environment";
import { header } from "../utils/http-handlers";

const VeiculoService = {
  cadastrar(veiculo) {
    return fetch(`${baseUrl}/veiculos`, {
      method: "POST",
      body: JSON.stringify(veiculo),
      headers: header(),
    }).then((r) => r.json());
  },

  alterar(veiculo) {
    return fetch(`${baseUrl}/veiculos` + veiculo.id, {
      method: "PUT",
      body: JSON.stringify(veiculo),
    }).then((r) => r.json());
  },

  consultar(id) {
    return fetch(`${baseUrl}/veiculos/` + id).then((r) => r.json());
  },

  listar() {
    return fetch(`${baseUrl}/veiculos`).then((r) => r.json());
  },

  dashboard() {
    return fetch(`${baseUrl}/veiculos/dashboard`, {
      headers: header(true),
    }).then((r) => r.json());
  },

  excluir(veiculo) {
    return fetch(`${baseUrl}/veiculos/` + veiculo.id, {
      method: "DELETE",
      headers: header(true),
    }).then((r) => r);
  },
};

export default VeiculoService;
