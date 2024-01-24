const{Router} = require('express')


const {registerUser,loginUser,getAuthors,getUser,changeAvatar,editUser} = require("../controllers/userControllers")
const authmiddleware = require("../middleware/authmiddleware")

const router = Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/:id',getUser)
router.get("/",getAuthors)
router.post('/change-avatar',authmiddleware,changeAvatar)
router.patch("/edit-user",authmiddleware,editUser)


module.exports = router