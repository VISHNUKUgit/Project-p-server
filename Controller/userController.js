const users = require("../DataBase/Models/userSchema");
const jwt = require('jsonwebtoken');
exports.register = async(req, res) => {
    console.log("inside register controller function");
    const {username,email,password} = req.body
    console.log(username,email,password);
    try{
        const existingUser = await users.findOne({email})
        if (existingUser){
            res.status(406).json("Account already exist@@@ Please Login...")
            console.log("406");
        }else{
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
            console.log(200);
        }
    }
    catch(err){
        res.status(401).json(`error:${err}`);
        console.log("401");
    }
   
};
exports.login = async (req,res)=>{
    console.log("inside login function");
    console.log(req.body);
    const {email,password} = req.body
    console.log(email,password);
    try {
        const existingUser = await users.findOne({email,password})
        // const alluser = await users.find()
        console.log(existingUser);
        if (existingUser !== null && existingUser !== undefined) {
            console.log("inside if function");
            // console.log("allUser",alluser);
            const token = jwt.sign({userid:existingUser._id},"ss9876")
            res.status(200).json({existingUser,token})
        }
        else
        {
            res.status(404).json(`incorrect Email / password`)
        }

    } catch (error) {
        res.status(401).json(`login api failed error: ${error}`)
    }
}
