const jwt = require('jsonwebtoken')
const SECRET_KEY = "mohithchalamala"
const Usermodel = require('../user_model')

const userauthenticate = (req,res,next) =>{
    try {
        const token = req.headers.authorization         //this returns the token generated when logged in
        const verifyToken = jwt.verify(token,SECRET_KEY)    //this returns the id,startdate,expiredate
        Usermodel.findOne({_id:verifyToken._id})            //using the id we search the database weather the user there or not, this is due to , to check weather user logged in or not
        .then((result)=>{
            if(!result){
                throw new Error('User not Logged')
            }
            req.token = token
            req.rootUser = result
            req.userId = result._id
            req.userMainId = result.id
            next();
        })
        .catch(e=>{
            res.json('Unauthorized no token allotted');
        })

    } catch (error) {
        res.json('Unauthorized no token alloted')
    }
}




module.exports = userauthenticate
