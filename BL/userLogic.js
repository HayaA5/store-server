//require('../DL/db').connect();
const userController = require('../DL/controllers/userController');
const {createToken} = require('./jwt');



async function getUserDetailsById(id) {//id
    // return await userController.readOne({_id:id});

    const user= await userController.readOne({_id:id});
    if(!user)  throw({code:400, message:"This user doesn't exist"});
    return user;
  //  await userController.create({ email: "Yon@walla.com" })
//return 333;
    // find
    // check if null or exist
    // return error / user {}


}

// async function register() {
//     // many many many validations

// }

let user1 = {
    firstName: "Yonatan",
    lastName: "Ramon",
    email: "Yokon@walla.com",
    password: "987865",
    address: {
        street: 12,
        homeNum: 34,
        city: "jerusalem",
    },
    gender: 'male'
}
async function getAllUsers(){
    const users= await userController.read({});
    if(users.length===0)  throw({code:400, message:"there is no users"});
    return users;
    //return userController.read({});
}

// exports.updateUser=async(id, newField)=>{
//     const updatedUser= await userController.update({_id:id, newField});
//     if(!updatedUser)throw({code:400, message:"user not updated"})
//     //await userController.update({_id:id, newField})
// };

async function updateUser(id, newField){
    const updatedUser= await userController.update({_id:id}, newField);
   // if(!updatedUser)throw({code:400, message:"user not updated"})
    //await userController.update({_id:id, newField})
    return updatedUser;
};


// create(user1)
// exports.getAllUsers=()=>{
//     return userController.read({});
// };

async function  register (userFields){//only the 1st time
    const eUser=await userController.read({email:userFields.email});
    if(eUser.length) throw({code:400, message:"this email already exists"});
    return userController.create(userFields);
};

//exports.login=async(email, password)=>{}

async function login(email, password){
    //validate basic
    if(!email||!password) throw({code:409, message:"missing data"});

    //check if such a user exisst in our application
    const eUser=await userController.read({email}, "password");
    if(eUser.length==0) throw({code:404, message:"user not found"});
    //password 
    // console.log(eUser);
    // console.log(password);
    // console.log(eUser[0].password);
    if(password!==eUser[0].password) throw({code:503, message:"password mismatch"});
    console.log("bbb"+eUser[0]._id);
    createToken(eUser[0]._id);
    console.log("xxx")
    return createToken(eUser[0]._id);
    return "success";
}


// exports.createUser=(userFields)=>{
//     return await userController.create(userFields);
// };
// exports.createUser=async (userFields)=>{
//     const eUser=await userController.read({email:userFields.email});
//     if(eUser.length) throw({code:400, message:"this email already exists"});
//     return userController.create(userFields);
// };

// exports.bla = () => { return { x: 'y' } }


exports.createUser = (userFields) => {
    return userController.create(userFields);
  };

  
//    exports.del =async (id) => {
//     const x= await userController.del({_id:id});
//     if (!x) throw({code:400, message:"user not deleted"});
//     return x;
//     //return userController.del({ _id: id });
  
//   }


async function del(id) {
    const x= await userController.del({_id:id});
    if (!x) throw({code:400, message:"user not deleted"});
    return x;
    //return userController.del({ _id: id });
  
  }




module.exports={getAllUsers,getUserDetailsById,del, updateUser, register, login}



  
