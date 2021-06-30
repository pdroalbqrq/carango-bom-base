import { getElementError } from "@testing-library/react";
import Validator from "../utils/validations";

function UseErros(getForm, setForm) {
  this.getForm = getForm;
  this.setForm = setForm;

  const handleUserInput = async (e, validations) => {
    const { name, value } = e.target;
    const newForm = { ...this.getForm, [name]: value };

    await this.setForm(newForm);
    this.getForm = newForm;

    validateField(name, value, validations);
  };

  const handleTouch = (e) => {
    const { name } = e.target;
    const contidion = this.getForm.formErrors[name];

    if (contidion.touched) return;

    contidion.touched = true;
    this.setForm({ ...this.getForm });
  };

  const validateField = (fieldName, value, validations) => {
    let fieldValidationErrors = this.getForm.formErrors;
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
    validateForm(fieldValidationErrors);
  };

  const validateForm = (formErrors) => {
    const isValidValues = Object.values(formErrors).map((val) => val.valid);

    this.setForm({
      ...this.getForm,
      formErrors,
      formValid: isValidValues.every((isVal) => isVal === true),
    });
  };

  const getError = (name) => {
    return (
      !this.getForm.formErrors[name].valid &&
      this.getForm.formErrors[name].touched
    );
  };

  const formatValid = (name, attributes) => {
    return {
      nome: name,
      atributos: attributes,
    };
  };

  return { handleUserInput, formatValid, handleTouch, getError };
}

export default UseErros;
