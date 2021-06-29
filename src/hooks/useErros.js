import Validator from "../utils/validations";

function UseErros() {
  const handleUserInput = async (e, validations, getForm, setForm) => {
    const { name, value } = e.target;
    await setForm({ ...getForm, [name]: value });
    validateField(name, value, getForm, validations, setForm);
  };

  const handleTouch = (e, getForm, setForm) => {
    const { name } = e.target;
    getForm.formErrors[name].touched = true;
    setForm({ ...getForm });
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
    validateForm(getForm, setForm, fieldValidationErrors);
  };

  const validateForm = (getForm, setForm, formErrors) => {
    setForm({
      ...getForm,
      formErrors,
      formValid: formErrors.username.valid && formErrors.password.valid,
    });
  };

  const formatValid = (name, attributes) => {
    return {
      nome: name,
      atributos: attributes,
    };
  };

  return { handleUserInput, formatValid, handleTouch };
}

export default UseErros;
