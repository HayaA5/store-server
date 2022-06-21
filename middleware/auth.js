const{ validateToken }=require("../BL/jwt");
const{ readOne }=require("../DL/controllers/userController");


async function auth(req, res, next){
    const token=req.headers.authorization;

    try{
        //verify token
        console(token);
    const decode=validateToken(token);
    const eUser=  await readOne({_id:decode.id});
    console.log("aa "+ eUser);
    if(!eUser) throw({code:503, message:"not authorized"});

    next()

    }catch(error){
        res.status(503).send({message:"not authorized"});
    }
    

    //check if the user exists

    //next/res error
}
module.exports = auth;