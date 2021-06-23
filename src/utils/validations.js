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
  confirmarSenha: (dado, campo, tamanho,a, b, c) => {
      console.log("dado", dado);
      console.log("campo", campo);
      console.log("tamanho", tamanho);
      console.log("nao sei ", a );
      console.log("nao sei ", b );
      console.log("nao sei ", c );
      return { valido: true, texto: "" };
  },
};

export default validations;
