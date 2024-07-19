const express = require('express')
const router = express.Router()
const moviecontrollers = require('../../controllers/moviescontrollers/moviecontrollers')
const userauthenticate = require('../../middlewear/userAuthenticate')
const moviestorageconfig = require('../../multer/moviestorageconfig')
//movie routes

router.post('/create',[userauthenticate,moviestorageconfig.single("image")],moviecontrollers.createmovie)
router.get('/getallmovie', moviecontrollers.getallusermovie)
router.patch('/update/:id',[userauthenticate,moviestorageconfig.single("image")],moviecontrollers.updatemovie)
router.delete('/delete/:id',userauthenticate,moviecontrollers.moviedelete)
router.get('/details/:id',moviecontrollers.getsinglemovie)
 
// movie rating

router.post('/movieratingadd/:movieid',userauthenticate,moviecontrollers.addmovierating)
router.get('/getmovierating/:movieid',moviecontrollers.getmovierating)
router.delete('/deletemovierating/:movieid',userauthenticate,moviecontrollers.deleterating)
module.exports = router