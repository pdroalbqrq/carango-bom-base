const header = (hasBody = false) => {
  const headerOptions = {
    Authorization: localStorage.getItem("jwt"),
  };
  if (!hasBody) {
    headerOptions["Content-Type"] = "application/json";
  }
  return headerOptions;
};

export { header };
