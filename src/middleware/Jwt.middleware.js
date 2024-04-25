import  jwt  from "jsonwebtoken"

const generateToken = () => {

    const sercretClave = process.env.JWT_SECRET

    const payload = {}

    return jwt.sign(payload, sercretClave, {expiresIn: '3h'});
}

//? Middleware for validating token.
const validateToken = ({ token, decoded }) => {

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err)
        } else {
            decoded = decoded;
        }
    })

}

export default generateToken