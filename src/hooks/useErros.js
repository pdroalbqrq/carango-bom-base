import { useState } from "react";

function useErros(validacoes) {
  const estadoInicial = criarEstadoInicial(validacoes);

  const [erros, setErros] = useState(estadoInicial);

  function validarCampos(event, tiposValidacao) {
    const { value } = event.target;
    const novoEstado = { ...erros };

    tiposValidacao.forEach((tipo) => {
      novoEstado[tipo.nome] = validacoes[tipo.nome](value, ...tipo.atributos);
      setErros(novoEstado);
    });
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

function criarEstadoInicial(validacoes) {
  const estadoInicial = {};
  for (let campo in validacoes) {
    estadoInicial[campo] = { valido: true, texto: "" };
  }

  return estadoInicial;
}

export default useErros;
