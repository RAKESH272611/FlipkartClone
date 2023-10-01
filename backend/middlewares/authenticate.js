import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next) => {
    try {
        // console.log(req.headers.authorization)
        let headerToken = req.headers.authorization
        if(headerToken){
            let tokens = headerToken.split(' ')
            let token = tokens[1];
            console.log('token received from frontend',tokens,process.env.JWT_SECRET_KEY)
            jwt.verify(token,process.env.JWT_SECRET_KEY,(error,decodedObject)=>{
                if(error){
                    return res.status(403).json('forbidden request');
                }
                next()
            })
        }
        else{
            // error response with 401 status code bad request
            return res.status(401).json('Bad requrest');
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}
