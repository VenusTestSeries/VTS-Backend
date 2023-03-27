import express from 'express';
import upload from '@/config/multer';
import { uploadImage } from '@/controllers/image.controller';
import { uploadUserIMage } from '@/controllers/image.controller';
import { uploadSeriesImage } from '@/controllers/image.controller';

const router = express.Router();

//UPLOAD IMAGE
router.post('/', upload.single('image'), uploadImage);
//UPLOAD SERIES IMAGE
router.post('/series', upload.single('image'), uploadSeriesImage);
//UPLOAD USER IMAGE
router.post('/users', upload.single('image'), uploadUserIMage);

export default router;

// res.status(200).json({
//   ...req.file,
//   url: imageUploadUrl,
// });

// const filename = path.basename(req.file.originalname, path.extname(req.file.originalname));
