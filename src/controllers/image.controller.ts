import path from 'path';
import * as fs from 'fs';
import sharp from 'sharp';
import { randomBytes } from 'crypto';
import { Request, Response } from 'express';
import { BASE_URL } from '@/config';

type UploadImageOptions = {
  filename: string;
  destination: string[];
  file: Express.Multer.File | undefined;
  urlRoot: string;
};

const directory = {
  uploads: 'uploads',
  images: 'images',
  series: 'series',
  users: 'users',
};

export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send({
      success: false,
      message: 'IMAGE is required',
    });
  }
  try {
    const { uploads, images } = directory;
    const imageUploadUrl = await UploadSingleImage({
      filename: 'image',
      file: req.file,
      urlRoot: `${BASE_URL}/${uploads}`,
      destination: [uploads, images],
    });
    res.send(imageUploadUrl);
  } catch (error) {
    res.status(500).send(error);
  }
};
export const uploadSeriesImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send({
      success: false,
      message: 'IMAGE is required',
    });
  }
  try {
    const { uploads, series } = directory;
    const imageUploadUrl = await UploadSingleImage({
      filename: 'image',
      file: req.file,
      urlRoot: `${BASE_URL}/${uploads}`,
      destination: [uploads, series],
    });
    res.send(imageUploadUrl);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const uploadUserIMage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send({
      success: false,
      message: 'IMAGE is required',
    });
  }
  try {
    const { uploads, users } = directory;
    const imageUploadUrl = await UploadSingleImage({
      filename: 'user_image',
      file: req.file,
      urlRoot: `${BASE_URL}/${uploads}`,
      destination: [uploads, users],
    });
    res.send(imageUploadUrl);
  } catch (error) {
    res.status(500).send(error);
  }
};

// UPLOAD SINGLE IMAGE
export const UploadSingleImage = async (options: UploadImageOptions) => {
  const { file, filename, destination, urlRoot } = options;
  if (!file) return undefined;

  const fileName = `${filename}_${randomBytes(16).toString('hex')}.webp`;
  const dirPath = path.join(__dirname, '../../dist', ...destination);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  console.log(dirPath);
  const uploadPath = path.join(dirPath, fileName);
  try {
    await sharp(file.path).webp({ quality: 90 }).toFile(path.resolve(uploadPath));
    fs.unlinkSync(file.path);
    return `${urlRoot}/${fileName}`;
  } catch (error) {
    fs.unlinkSync(file.path);
    throw error;
  }
};
