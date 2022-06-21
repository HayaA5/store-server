const jwt=require("jsonwebtoken");
const secret="1234"

function createToken(id){
    const token = jwt.sign({id},secret,{expiresIn:"1h"}) //{id} <--> {id:id}
    console.log("token created");
    return token;
}

console.log(createToken("abc"));

function validateToken(token){
    return jwt.verify(token,secret);

}

// console.log("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjFhZTQ5MmQ1MWY0MjNkNDc5ZDVkMiIsImlhdCI6MTY1NTgyMTAyMywiZXhwIjoxNjU1ODI0NjIzfQ.w0PlG1lCLMgpMe7ik27NBcpHCa_QZ7adXwNVLV1OiU0")
module.exports = {createToken,validateToken};