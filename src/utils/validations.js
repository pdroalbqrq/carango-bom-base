const validations = {
  tamanhoMinimo: (dado, campo, tamanho) => {
    const errorObject = {
      valido: false,
      texto: `${campo} deve ter ao menos ${tamanho} caracteres.`,
    };

    if (dado && dado.length < tamanho) {
      return errorObject;
    }
    return { valido: true, texto: "" };
  },
  tamanhoMaximo: (dado, campo, tamanho) => {
    const errorObject = {
      valido: false,
      texto: `${campo} deve ter no máximo ${tamanho} caracteres.`,
    };

    if (dado && dado.length > tamanho) {
      return errorObject;
    }
    return { valido: true, texto: "" };
  },
  obrigatorio: (dado, campo) => {
    const errorObject = {
      valido: false,
      texto: `${campo} é um campo obrigatório`,
    };

    if (!dado) {
      return errorObject;
    }

    return { valido: true, texto: "" };
  },
  anoValido: (dado) => {
    const errorObject = {
      valido: false,
      texto: `Data inválida`,
    };

    if (!dado) {
      return errorObject;
    }
    const date = /\d{4}/.test(dado);

    if (
      !date ||
      parseInt(dado) > new Date().getFullYear() ||
      parseInt(dado) < 1900
    ) {
      return errorObject;
    }
    return { valido: true, texto: "" };
  },
  precoValido: (dado, campo) => {
    const errorObject = {
      valido: false,
      texto: `${campo} inválido`,
    };

    if (typeof dado === "number") {
      errorObject.texto = "Digite apenas números";
      return errorObject;
    }
    if (parseInt(dado) > 10000000) {
      errorObject.texto = "Valor muito alto";
      return errorObject;
    }
    if (parseInt(dado) < 1000) {
      errorObject.texto = "Valor muito baixo";
      return errorObject;
    }

    return { valido: true, texto: "" };
  },
};

export default validations;
