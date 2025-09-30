//main code logic that how an api works and send reponse to frontend
const {loginValidation} = require("../../services/validationScheme")
const registerModel = require("../../models/register.model")

const login = async (req, res, next) => {
    try{
        const result = await loginValidation.validateAsync(req.body.values)
        const{username, password} = result;
        console.log(result)
         
        const user = await registerModel.findOne({ username: username });
            if (!user) {
                return res.status(400).json({
                    message: "Username not found!",
                    success: false,
        });

    }
        return res.status(200).json({
            message: "Api worked correctly",
            success: true,
        });
    } catch (error) {
        next(error)
        console.log(error)
    }
}
 module.exports = login;
