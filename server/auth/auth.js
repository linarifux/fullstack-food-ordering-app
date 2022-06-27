const jwt = require('jsonwebtoken')

const auth = async (req,res,next) => {
    try{
        
    }catch(e){
        res.status(401).send('Please, Authenticate first!')
    }
}