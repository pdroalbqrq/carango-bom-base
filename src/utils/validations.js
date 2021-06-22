const validations = {
  tamanhoMinimo: (dado, campo, tamanho, error) => {
    const errorObject = {
      valido: false,
      texto: `${campo} deve ter ao menos ${tamanho} letras.`,
    };

    if (dado && dado.length <= tamanho) {
      return errorObject;
    }
    return { valido: true, texto: "" };
  },
  tamanhoMaximo: (dado, campo, tamanho, error) => {
    const errorObject = {
      valido: false,
      texto: `${campo} deve ter no máximo ${tamanho} letras.`,
    };

    if (dado && dado.length >= tamanho) {
      return errorObject;
    }
    return { valido: true, texto: "" };
  },
};

export default validations;
