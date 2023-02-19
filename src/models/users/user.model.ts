import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { model, Schema } from 'mongoose';
import { FORGET_PASSWORD_EXPIRE, JWT_EXPIRY, JWT_SECRET } from '@/config';
import crypto from 'crypto';

const user = new Schema({
  name: {
    type: String,
    required: [true, 'Please Provide a name'],
    maxLength: [50, 'Name should be under 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please Provide a email'],
    validate: [validator.isEmail, 'Please enter a valid email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please Provide a password'],
    minLength: [8, 'Password should be atleast 8 characters'],
    select: false,
  },
  role: {
    type: String,
    default: 'user',
  },
  avatar: {
    type: String,
    id: { type: String },
    previewUrl: { type: String },
  },
  forgetPasswordToken: {
    type: String,
  },
  forgetPasswordExpiry: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

// Encrypt password before save
user.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Validate Password with passed on user password
user.methods.isValidatedPassword = async function (userSendPassword: string | Buffer) {
  return bcrypt.compare(userSendPassword, this.password);
};

// Create and return JWT token
user.methods.getJwtToken = async function () {
  return jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
};

// Generate Forget Password Token (string)
user.methods.getForgetPasswordToken = async function () {
  const token = crypto.randomBytes(20).toString('hex');
  const hashToken = crypto.createHash('sha256').update(token).digest('hex');
  this.forgetPasswordToken = hashToken;
  this.forgetPasswordExpiry = Date.now() + FORGET_PASSWORD_EXPIRE;
  return token;
};
const User = model('users', user);
export default User;
