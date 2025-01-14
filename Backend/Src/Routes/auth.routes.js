import express from 'express'; 
import { checkAuth, loginHandler, logoutHandler, signupHandler } from '../Controllers/auth.controller.js';
import { protectRoute } from '../Middleware/auth.middleware.js';


const router = express.Router(); 


router.post('/signup', signupHandler);
router.post('/login', loginHandler); 
router.post('/logout', logoutHandler); 

//to check authenticatoin upon refresh 
router.get('/check', protectRoute , checkAuth); 


export default router; 