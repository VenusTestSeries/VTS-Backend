import * as userController from '@/controllers/user.controller';
import { Router } from 'express';

const { signUp, signIn, getAllUsers, getUserById, deleteUserById } = userController;
const router = Router();
/**
 * Get All Users
 */
router.get('/', getAllUsers);
/**
 * Get User by ID
 */
router.get('/:user_id', getUserById);
/**
 * Update User by ID
 */
router.get('/:user_id', getUserById);
/**
 * Delet User by ID
 */
router.delete('/:user_id', deleteUserById);
/**
 * Sign Up User
 */
router.post('/signup', signUp);
router.post('/register', signUp);
/**
 * Sign In User
 */
router.post('/login', signIn);
router.post('/signin', signIn);

export default router;
