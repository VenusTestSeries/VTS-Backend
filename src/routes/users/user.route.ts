import { signUp, signIn, getAllUsers, getUserById, deleteUserById } from '@/controllers/user.controller';
import { Router } from 'express';

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
 * Create User
 */
router.post('/signin', signIn);
router.post('/signup', signUp);
/**
 * Update User
 */

/**
 * Delete User
 */

/**
 * Get User
 */

export default router;
