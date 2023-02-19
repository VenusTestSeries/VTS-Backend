import User from '@/models/users/user.model';
import bigPromise from '@/utils/big-promise';
import cookieToken from '@/utils/cookie-token';

export const getAllUsers = bigPromise(async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
export const getUserById = bigPromise(async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.user_id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
export const deleteUserById = bigPromise(async (req, res, next) => {
  try {
    const user = await User.deleteOne({ _id: req.params.user_id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
export const signIn = bigPromise(async (req, res, next) => {
  console.log(req.body);
  res.status(200).json('Hello Simple');
});
export const signUp = bigPromise(async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    console.log({ user });
    await cookieToken<typeof user>(user, res);
  } catch (error) {
    res.status(500).json(error);
  }
});
