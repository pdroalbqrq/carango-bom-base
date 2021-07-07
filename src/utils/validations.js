const validations = {
  tamanhoMinimo: (dado, campo, tamanho) => {
    const errorObject = {
      valido: false,
      texto: `${campo} deve ter ao menos ${tamanho} letras.`,
    };

    if (dado && dado.length <= tamanho) {
      return errorObject;
    }
    return { valido: true, texto: "" };
  },
  tamanhoMaximo: (dado, campo, tamanho) => {
    const errorObject = {
      valido: false,
      texto: `${campo} deve ter no máximo ${tamanho} letras.`,
    };

    if (dado && dado.length >= tamanho) {
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
};

export default validations;
