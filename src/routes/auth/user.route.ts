import * as userController from '@/controllers/user.controller';
import { Router } from 'express';

const { signUp, signIn, getAllUsers, getUserById, deleteUserById } = userController;
const router = Router();
/**
 * Get All Users
 */
router.get('/user', getAllUsers);
/**
 * Get User by ID
 */
router.get('/user/:user_id', getUserById);
/**
 * Update User by ID
 */
router.get('/user/:user_id', getUserById);
/**
 * Delet User by ID
 */
router.delete('/user/:user_id', deleteUserById);
/**
 * Sign Up User
 */
router.post('/user/signup', signUp);
router.post('/user/register', signUp);
/**
 * Sign In User
 */
router.post('/user/login', signIn);
router.post('/user/signin', signIn);

export default router;
