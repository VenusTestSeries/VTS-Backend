import { Response } from 'express';

const cookieToken = async <U>(user: U | any, res: Response) => {
  const token = await user.getJwtToken();
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  user.password = undefined;
  console.log({ token });
  res.status(200).cookie('token', token, options).json({
    success: true,
    token: token,
    user: user,
  });
};

export default cookieToken;
