import authService from "../services/auth.service.js"

const auth = async(req, res) => {
    try {
        const user = await authService.auth(req.body);
        if (!user) {
            res.status(404).json({
                message: "User not found"
            })
        }        

        return res.status(200).json({
            message: "Successfully authenticated",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "An error occurred while authenticating",
            error: error.message
        })
    }
}

export default {
    auth
}