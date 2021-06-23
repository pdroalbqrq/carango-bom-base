import Validator from "../utils/validations";

function UseErros() {
  const handleUserInput = (e, validations, getForm, setForm) => {
    const { name, value } = e.target;
    validateField(name, value, getForm, validations, setForm);
    setForm({ ...getForm, [name]: value });
  };

  const validateField = (fieldName, value, getForm, validations, setForm) => {
    let fieldValidationErrors = getForm.formErrors;
    let validationsFound = [];

    validations.forEach((validation) => {
      validationsFound.push(
        Validator[validation.nome](value, ...validation.atributos)
      );
    });

    const hasError = validationsFound.find((val) => !val.valido);

    if (hasError) {
      fieldValidationErrors[fieldName].text = hasError.texto;
      fieldValidationErrors[fieldName].valid = hasError.valido;
    }

    if (!hasError) {
      fieldValidationErrors[fieldName].text = "";
      fieldValidationErrors[fieldName].valid = true;
    }

    setForm(
      {
        ...getForm,
        formErrors: fieldValidationErrors,
      },
      validateForm(getForm, setForm)
    );
  };

  const validateForm = (getForm, setForm) => {
    setForm({
      ...getForm,
      formValid: getForm.usernameValid && getForm.passwordValid,
    });
  };

  const formatValid = (name, attributes) => {
    return {
      nome: name,
      atributos: attributes,
    };
  };

  return { handleUserInput, formatValid };
}

export default UseErros;
