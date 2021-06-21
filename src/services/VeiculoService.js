import baseUrl from "../config/environment";

const VeiculoService = {
  listar() {
    return fetch(`${baseUrl}/veiculos/`).then((r) => r.json());
  },
};

export default VeiculoService;
