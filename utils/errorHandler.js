const {INTERNAL_SERVER_ERROR} = require("./errorMessages");

class ErrorHandler {
    handleInternalServerError = (response)=>{
        response.status(500);
        response.json({"message": INTERNAL_SERVER_ERROR});
    }
}

module.exports = {
    customizedErrorHandler: new ErrorHandler()
}