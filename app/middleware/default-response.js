
/** Returns general error message */
module.exports.errorResponse = (res, error, message = 'error', errCode = 500, next) => {
    console.log(error);
    console.log(error.name);
    console.log(error.stack);
    let msg = 'An error occured: ';
    if (error.message) {
        msg = message + error.message;
    }
    const responseData = {
        message: msg,
        error: error
    };
    if (next !== undefined) {
        next(responseData);
    } else {
        res.status(errCode).send(responseData);
    }
};

/** Returns general success message */
module.exports.successResponse = (res, succData, message = 'Success!', next) => {
    if (succData.stack) {
        errorResponse(res, succData, 'Server Error: ');
    } else {
        if (next !== undefined) {
            next(succData);
        } else {
            res.status(200).send(succData);
        }
    }
};
