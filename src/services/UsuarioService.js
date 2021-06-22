import baseUrl from "../config/environment";

const UsuarioService = {
  autorizar(user) {
    return fetch(`https://60d1d60d5b017400178f479a.mockapi.io/api/auth`).then(
      (r) => {
          console.log(r.json());
        return  r.json()[0]
        }
    );
  },
  desabilitarToken() {
    return fetch(`https://60d1d60d5b017400178f479a.mockapi.io/api/auth`).then(
      (r) => {
        console.log(r.json());
        return r.json()[0];
      }
    );
  },
};

export default UsuarioService;
