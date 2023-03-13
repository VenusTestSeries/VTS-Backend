import path from 'path';
import * as fs from 'fs';
import sharp from 'sharp';
import MultipleFile from '@/models/image/multiple.route';
import { randomBytes } from 'crypto';

type UploadImageOptions = {
  filename: string;
  destination: string[];
  file: Express.Multer.File | undefined;
  urlRoot: string;
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

// .resize(850, 600, {
//   fit: 'cover',
// })

type IDetails = {
  name: string;
  price: string;
  des: string;
};

export const multipleFileUpload = async (files: any, details: IDetails) => {
  if (!details.name || !details.price || !details.des) {
    throw Error('all fields are required');
  }
  let filesArray: any = [];
  files.forEach((element: any) => {
    const file = {
      fileName: element.originalname,
      filePath: element.path,
      fileType: element.mimetype,
      fileSize: fileSizeFormatter(element.size, 2),
    };
    filesArray.push(file);
  });

  const multipleFiles = new MultipleFile({
    name: details.name,
    price: details.price,
    des: details.des,
    files: filesArray,
  });
  await multipleFiles.save();
  return 'Files Uploaded Successfully';
};

//check file size here...
const fileSizeFormatter = (bytes: number, decimal: number) => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const dm = decimal || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
};

//  get all multiple beds
export const getMultipleFilesService = async () => {
  const response = await MultipleFile.find();
  return response;
};

// get multiple beds by id
export const getMultipleFilesByIdService = async (id: string) => {
  const response = await MultipleFile.findById(id);
  return response;
};

// delete beds by id
export const deleteFileService = async (id: string) => {
  const deleteFile = await MultipleFile.findByIdAndDelete(id);
  return deleteFile;
};
