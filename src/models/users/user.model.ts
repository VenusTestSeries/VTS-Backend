import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { model, Schema } from 'mongoose';
import { FORGET_PASSWORD_EXPIRE, JWT_EXPIRY, JWT_SECRET } from '@/config';
import crypto from 'crypto';

const userSchema = new Schema(
  {
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
      required: [false, 'Please Provide a password'],
      minLength: [8, 'Password should be atleast 8 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'sub-admin', 'super-admin', 'developer'],
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
    provider: {
      type: String,
      enum: ['local', 'google', 'facebook'],
      default: 'local',
    },
    refreshToken: {
      type: String,
    },
    accessToken: {
      type: String,
    },
  },

  {
    methods: {
      checkValidPassword: async function (userSendPassword: string) {
        return bcrypt.compare(userSendPassword, this.password);
      },
      getJwtToken: async function () {
        const user = {
          id: this._id,
          name: this.name,
          role: this.role,
        };
        return jwt.sign({ ...user, iat: Math.floor(Date.now() / 1000) - 30 }, JWT_SECRET, {
          expiresIn: JWT_EXPIRY,
        });
      },
      getForgetPasswordToken: async function () {
        const token = crypto.randomBytes(40).toString('hex');
        const hashToken = crypto.createHash('sha256').update(token).digest('hex');
        this.forgetPasswordToken = hashToken;
        this.forgetPasswordExpiry = (Date.now() + FORGET_PASSWORD_EXPIRE) as any;
        return token;
      },
    },
  },
);
// Encrypt password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const User = model('users', userSchema);
export default User;
