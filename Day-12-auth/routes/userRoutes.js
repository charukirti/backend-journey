import express from 'express'
import { getUser, getUsers, health, showSignIn, showSignUp, signIn, signUp } from '../controllers/userController.js';

const router = express.Router()

// health check

router.get('/', health)

// sign in form
router.get('/signin', showSignIn) 

// sign up form
router.get('/signup', showSignUp) 

// sign in route
router.post('/signin', signIn) 

// sign up route
router.post('/signup', signUp) 

// get all users route
router.get('/users', getUsers) 

// get user route
router.get('/user', getUser) 

export default router