const {INTERNAL_SERVER_ERROR} = require("./errorMessages");

class CustomError extends Error {
    constructor(code,...params){
        super(...params);
        this.code = code;
        this.SetMessage();
    }
    SetMessage(){
        switch(this.code){
            case 500:
                this.message = INTERNAL_SERVER_ERROR;
                break;
            default:
                this.message = "Error code unspecified";
        }
    }
}

module.exports = CustomError;