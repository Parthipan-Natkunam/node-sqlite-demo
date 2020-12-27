function emptyRouteController(response) {
  response.sendStatus(200);
}

const generals = {
  handleRoot: (request, response, next) => {
    emptyRouteController(response);
    next();
  },
  healthCheck: (request, response, next) => {
    emptyRouteController(response);
    next();
  },
};

module.exports = {
  generals,
};
