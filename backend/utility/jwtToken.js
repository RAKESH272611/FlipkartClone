import jwt from 'jsonwebtoken'

const generateToken = (username,email) => {
    let token = jwt.sign({
        username,
        email
    }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXP })
    return token
}

export default generateToken