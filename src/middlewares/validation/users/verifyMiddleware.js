

const verifyMiddleware = (req, res, next) =>{
    console.log("verify");
    next()
}

module.exports = {verifyMiddleware}