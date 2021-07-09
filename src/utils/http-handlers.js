const header = (hasBody = false) => {
  const headerOptions = {
    Authorization: localStorage.getItem("jwt"),
  };
  if (!hasBody) {
    headerOptions["Content-Type"] = "application/json";
  }
  return headerOptions;
};

const handleResponse = (response, hasBody = true) => {
  if (response.status === 403) {
    localStorage.removeItem("jwt");
    throw new Error("Não autorizado");
  }

  return hasBody ? response.json() : response;
};

export { header, handleResponse };
