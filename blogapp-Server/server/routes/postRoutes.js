const{Router} = require('express')
const{createPost,getPosts,getPost,getCatPosts,getUserPosts,editPost,deletePost} = require("../controllers/postControllers")
const authmiddleware = require('../middleware/authmiddleware')
const router = Router()

router.post('/',authmiddleware,createPost)
router.get('/',getPosts)
router.get('/:id',getPost)
router.get('/categories/:category',getCatPosts)
router.get('/users/:id',getUserPosts)
router.patch('/:id',authmiddleware,editPost)
router.delete('/:id',authmiddleware,deletePost)

module.exports = router