import User from '@/models/users/user.model';
import bigPromise from '@/utils/big-promise';
import cookieToken from '@/utils/cookie-token';
import CoffeeError from '@/utils/custom-error';

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

export const signUp = bigPromise(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new CoffeeError('Required', 400));
  }
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    await cookieToken<typeof user>(user, res);
  } catch (error) {
    res.status(500).json(error);
  }
});

export const signIn = bigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  console.log(req.body);
  if (!email || !password) {
    return next(new Error('Email and password Required '));
  }
  const user = await User.findOne({ email }).select('+password');
  console.log({ user });
  if (!user) {
    return next(new Error('Email and password not matched '));
  }
  const isCorrectPassword = await user.checkValidPassword(password);
  if (!isCorrectPassword) {
    return next(new Error('Not Registered User'));
  }
  await cookieToken(user, res);
});

export const logOut = bigPromise(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: 'Logout User Successfully',
  });
});
