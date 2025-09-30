const {registerValidation} = require("../../services/validationScheme")
const registerModel = require("../../models/register.model")

const register = async (req, res, next) => {
    try{
        const result = await registerValidation.validateAsync(req.body.values);
        const {email,fullName,username,password}=result;
        console.log(result);

        const user = await registerModel.findOne({email: email})
        if (user) {
            return res.status(400).json({
                message: "User already exists!",
                success: false,
            });                                                                                
        }
        const newUser = new registerModel({
            fullName: fullName,
            email: email,
            username: username,
            password: password,
        })
        await newUser.save()
        return res.status(200).json({
            message: "Api worked correctly",
            success: true,
        });
    } catch (error) {
        next(error)
        console.log(error)
    }
}
 module.exports = register;
 