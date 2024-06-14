class HandleError extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.Operational = true;
        Error.captureStackTrace(this, this.constructore);
    };
};
export default HandleError;