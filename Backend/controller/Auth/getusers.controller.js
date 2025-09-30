const registerModel = require("../../models/register.model");

const users = async (req, res, next) => {
    try {
        const GETUSERS = await registerModel.find()
        console.log("Users fetched successfully");
        
        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            users: GETUSERS, 
            count: GETUSERS.length
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching users",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = users;