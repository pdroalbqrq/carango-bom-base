
const validations = {
  tamanhoMinimo: (dado, campo, tamanho, tipo) => {
    const field = campo.toLowerCase();
    if (dado && dado.length >= tamanho) {
      return { valido: true, field,tipo, texto: "" };
    }
    return {
      valido: false,
      texto: `${campo} deve ter ao menos ${tamanho} letras.`,
      field,
      tipo
    };
  },
  tamanhoMaximo: (dado, campo, tamanho, tipo) => {
    const field = campo.toLowerCase();
    if (dado && dado.length <= tamanho) {
      return { valido: true, field, tipo, texto: "" };
    }
    return {
      valido: false,
      texto: `${campo} deve ter no máximo ${tamanho} letras.`,
      field,
      tipo
    };
  },
  campoCerto: (campo, erros) => {
   return (
     erros.find((erro) => erro.field === campo) || {
       valido: true,
       texto: "",
       field: "",
       validation: campo,
     }
   );
  }
};

export default validations;
