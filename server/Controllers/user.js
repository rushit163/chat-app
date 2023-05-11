const User = require('../Models/userModel')
const bcrypt = require('bcrypt')



module.exports.register = async (req, res, next)=>{
    try{
    const {username,email,password} = req.body;
    const validusername = await User.findOne({username});
    if(validusername){
        return res.json({msg : 'Username in use', status : false})
    }
    const validemail = await User.findOne({email});
    if(validemail){
        return res.json({msg : 'Email in use', status : false})
    }
    const hashpassword = await bcrypt.hash(password,10);
    const user = await User.create({
        username,
        email,
        password : hashpassword
    });
    delete user.password
    return res.json({status:true,user})
    }catch(err){
        next(err)
    }
}

module.exports.login = async (req,res,next)=>{
    try{
        const {username,password} = req.body;
        const validusername = await User.findOne({username});
        if(!validusername){
            return res.json({msg : 'Username not found', status : false})
        }
        const validpassword = await bcrypt.compare(password,validusername.password)
        if(!validpassword){
            return res.json({msg : 'Username not found', status : false})
        }
        delete validusername.password
        return res.json({status:true,validusername})
        }catch(err){
            next(err)
        }

}