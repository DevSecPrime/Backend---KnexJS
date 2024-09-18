import userController from './user.controller'
import validator from '../../comman/config/validator'
import expressAsyncHandler from 'express-async-handler'
import userDtos from './dtos/user.dtos'
import auth from '../../comman/middleware/authMiddleware'

import express from 'express'

const router = express.Router()

router.post(
  '/register',
  validator.body(userDtos),
  expressAsyncHandler(userController.register),
)

router.post('/login', expressAsyncHandler(userController.login))

router.get('/profile', auth, expressAsyncHandler(userController.profile));
router.get("/",expressAsyncHandler(userController.getAllUser));

router.post('/upload', expressAsyncHandler(userController.localFileUplaod))
router.post('/logOut', auth, expressAsyncHandler(userController.logOut))
router.delete("/deleteAccount", auth, expressAsyncHandler(userController.deleteAccount));

export default router
