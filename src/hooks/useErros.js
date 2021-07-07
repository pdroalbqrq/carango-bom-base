import { getElementError } from "@testing-library/react";
import Validator from "../utils/validations";

function UseErros(getForm, setForm) {
  const handleUserInput = async (e, validations) => {
    const { name, value } = e.target;
    const newForm = { ...getForm, [name]: value };

    await setForm(newForm);
    getForm = newForm;

    validateField(name, value, validations);
  };

  const handleTouch = (e) => {
    const { name } = e.target;
    const contidion = getForm.formErrors[name];

    if (contidion.touched) return;

    contidion.touched = true;
    setForm({ ...getForm });
  };

  const validateField = (fieldName, value, validations) => {
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
    validateForm(fieldValidationErrors);
  };

  const validateForm = (formErrors) => {
    const isValidValues = Object.values(formErrors).map((val) => val.valid);

    setForm({
      ...getForm,
      formErrors,
      formValid: isValidValues.every((isVal) => isVal === true),
    });
  };

  const getError = (name) => {
    return !getForm.formErrors[name].valid && getForm.formErrors[name].touched;
  };

  const formatValid = (name, attributes) => {
    return {
      nome: name,
      atributos: attributes,
    };
  };

  const formValue = () => {
    const newForm = { ...getForm };

    delete newForm.formValid;
    delete newForm.formErrors;

    return newForm;
  };

  return { handleUserInput, formatValid, handleTouch, getError, formValue };
}

export default UseErros;
