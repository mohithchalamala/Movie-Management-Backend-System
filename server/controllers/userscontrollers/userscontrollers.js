const Usermodel = require('../../user_model')
const jwt = require('jsonwebtoken')
const SECRET_KEY = "mohithchalamala"
//register
const register = (req,res) =>{
    const {username, email, password}  = req.body;          //req.body will fetch data from the frontend i.e user entered data

    if(!username || !email || !password){
        res.json('All fields required')
    }else{
        try {
            Usermodel.findOne({email:email})
            .then((result)=>{
                if(result){
                    res.json("This User already Exists")
                }
                else{
                    const x = new Usermodel(req.body)
                    x.save()
                    .then((result)=>{
                        res.json('Registered Successfully')
                    })
                    .catch(e=>{
                        console.log(e)
                    })
                } 
            })
            .catch(e=>{
                console.log(e)
            })
        } catch (error) {
            
        }
    }
}


//login

const login = (req,res) =>{
    const {email, password} = req.body
    if(!email || ! password){
        res.json('All fields Required')
    }
    else{
        try {
            Usermodel.findOne({email:email, password:password})
            .then((result)=>{
                if(email === result.email && password == result.password){
                     const token = jwt.sign({_id:result._id},SECRET_KEY,{
                        expiresIn:'1d'
                     })
                    result.tokens = {token}
                    result.save()
                    res.json({mssg:'Login Successful',token})
                }
                else{
                    res.json('Login Failed')
                }
            })
            .catch(e=>{
                console.log(e)
            })
        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = {
    register,
    login
}