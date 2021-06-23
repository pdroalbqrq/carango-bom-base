import Validator from "../utils/validations";

class UseErros {
   handleUserInput(e, validations, getForm, setForm) {
    const { name, value } = e.target;

    setForm({ ...getForm, [name]: value });
    this.validateField(name, value, getForm, validations, setForm);
  }

   validateField(fieldName, value, getForm, validations, setForm) {
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
      this.validateForm(getForm, setForm)
    );
  }

   validateForm(getForm, setForm) {
    setForm({
      ...getForm,
      formValid: getForm.usernameValid && getForm.passwordValid,
    });
  }
}


export default UseErros;
