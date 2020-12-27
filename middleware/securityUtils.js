function stripTagsFromStrings(inputArray) {
  return inputArray.map((datum) => {
    if (typeof datum === "string") {
      return datum.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    return datum;
  });
}

function cleanProductRequestData(request, response, next) {
  const { name, description, price, available_units } = request.body;
  const cleansedData = stripTagsFromStrings([
    name,
    description,
    price,
    available_units,
  ]);
  request.body = {
    ...request.body,
    name: cleansedData[0],
    description: cleansedData[1],
    price: cleansedData[2],
    available_units: cleansedData[3],
  };
  next();
}

module.exports = {
  securityUtils: {
    cleanProductRequestData,
  },
};
