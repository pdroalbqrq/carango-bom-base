const validations = {
  tamanhoMinimo: (dado, tipo, tamanho) => {
    if (dado && dado.length >= tamanho) {
      return { valido: true };
    }
    return {
      valido: false,
      texto: `${tipo} deve ter ao menos ${tamanho} letras.`,
    };
  },
  tamanhoMaximo: (dado, tipo, tamanho) => {
    if (dado && dado.length <= tamanho) {
      return { valido: true };
    }
    return {
      valido: false,
      texto: `${tipo} deve ter no máximo ${tamanho} letras.`,
    };
  },
};

export default validations;
