const express = require('express')
const router  = new express.Router()
const userController = require('../Controller/userController')
const projectController = require('../Controller/projectController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerConfig = require('../middleware/multerMiddleware')
//register API
router.post('/user/register',userController.register)

//login 
router.post('/user/login',userController.login)

//add projects
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImg'),projectController.addProjects)

// get user Projects
// use post if body has any conetnet other wise use get
router.get('/user/all-projects',jwtMiddleware,projectController.userProjects)

// get all Projects
router.get('/projects/all',jwtMiddleware,projectController.getAllProjects)

// get threeProjects
router.get('/projects/home-projects',projectController.getThreeProjects)

// edit project
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single('projectImg'),projectController.editProjectDetails)

// Delete Project
// router.delete('/delete/project/:projectId',jwtMiddleware,projectController.deleteProjectController) 
router.delete('/delete/project/:id',jwtMiddleware,projectController.deleteProjectController)

// Update User
router.put('/user/edit',jwtMiddleware,multerConfig.single('profile'),userController.updateProfile)

// export router
module.exports = router
