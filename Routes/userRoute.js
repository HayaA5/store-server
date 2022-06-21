
const userLogic = require('../BL/userLogic')
const express=require('express');
const router = express.Router();
const auth=require('../middleware/auth');

// router.use(auth); //if login ok, can acceess to other routes

router.all("/test", auth, (req, res) => { //check auth and if ok, continue other functions-->here:test
    res.send("test");
})

router.post('/login', async(req,res) => {
    
    try{
       // res.send("login");
      const token=  await userLogic.login(req.body.email, req.body.password);
      res.send(token)
        // res.send("login");
    }catch(error){
        console.log(error.message);
        res.status(500).send("sorry, something went wrong");
    }
   
})

router.post('/register', async(req,res) => {
    try{
        const newUser=await userLogic.register(req.body);
        console.log(newUser, "new user");
        res.send("register");
    }catch(error){
        console.log(error.message);
        res.status(500).send("sorry, something went wrong");
    }
})



// router.get('/', (req, res) => {
//     res.send('Hello World! blaa')
// })
// router.get('/haya', (req, res) => {
//     res.send('Hello World! haya')
// })

// router.get('/', async (req, res) => {
//     const users=await userLogic.getAllUsers();
//     res.send(users);
// })

// router.get('/', async (req, res) => {
//     const users=await userLogic.getAllUsers();
//     //const users=await userLogic.getUserDetailsById();
//     res.send(users);
// })




router.get('/', async (req, res) => {
    // console.log("bla");
    // console.log(req.query.id);
    try{
    // const users=await userLogic.getUserDetailsById(req.query.id);
    const users=await userLogic.getAllUsers();
     res.send(users);
    } catch(error){
        console.log(error.message);
        res.status(500).send("sorry something went wrong");
    }
    // user= await  userLogic.getUserDetailsById(req.params.id);
   /// res.send(user);
 })

// router.get('/:id', async (req, res) => {
//    const user= await  userLogic.getUserDetailsById(req.params.id);
//    res.send(user);
// })

router.get('/:id', async (req, res) => {
    try{
    const user= await  userLogic.getUserDetailsById(req.params.id);
    // const user= await  userLogic.getUserDetailsById("62aae4c75e5584042d2414a8");
    res.send(user);
    }catch(error){
        console.log(error.code);
     console.log(error.message);
     res.status(error.code|| 500).send(error.message);  
    }
 })

//  router.delete("/edit_user/:id", async (req, res)=>{
//     userLogic.del(req.params.id);
// console.log(req.body);
// res.send("blalal") //on le voit ds postman en bas, c ce qu'il renvoie
// })


 router.put("/edit_user/:id", async (req, res)=>{
try{
    
   const user=await userLogic.updateUser(req.params.id, req.body);
   if(user){
    console.log("user not found")
   }
   
    console.log(req.body); //ex: {lastName:gut}
res.send(user) //on le voit ds postman en bas, c ce qu'il renvoie
}catch(error){
console.log(error.message);
res.status(error.code|| 500).send("error");
 }
})




// router.post('/', async (req, res) => {
//  const {firstName, lastName}   =req.body;
//  const restFields={
//      password: "987865",
//      address: {
//          street:12,
//          homeNum:34,
//          city:"jerusalem",
//      },
//      gender:"male",
//  };
//  const userFields={firstName, lastName,email, ...restFields};
//  const user= await userLogic.createUser(userFields);
 
// })

router.get('/', async (req, res) => { // was /user

   //  res = await userLogic.bla();

    res.send({
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
    })
});

module.exports=router;
