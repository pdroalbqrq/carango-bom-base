import { useState } from "react";

function useErros(validacoes) {
  const estadoInicial = []
  console.log(estadoInicial);

  const [erros, setErros] = useState(estadoInicial);

  function validarCampos(event, tiposValidacao) {
    const { value } = event.target;
    let novoEstado = [ ...erros ];
    tiposValidacao.forEach((tipo) => {
      novoEstado.push(
        validacoes[tipo.nome](value, ...tipo.atributos, tipo.nome)
      );
    });

    setErros([
      ...new Map(
        novoEstado.map((item) => {
          return [item.tipo, item];
        })
      ).values(),
    ]);
  }

  function possoEnviar() {
    for (let campo in erros) {
      if (!erros[campo].valido) {
        return false;
      }
    }

    return true;
  }

  return [erros, validarCampos, possoEnviar];
}


export default useErros;
