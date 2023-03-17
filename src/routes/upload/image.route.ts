import upload from '@/config/multer';
import { BASE_URL } from '@/config';
import { Request, Response, Router } from 'express';
import { UploadSingleImage } from '@/controllers/image.controller';

const router = Router();

const directory = {
  dirOne: 'uploads',
  dirTwo: 'images',
};

router.post('/', upload.single('image'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send({
      success: false,
      message: 'IMAGE is required',
    });
  }
  try {
    const { dirOne, dirTwo } = directory;
    const imageUploadUrl = await UploadSingleImage({
      filename: 'simple_image',
      file: req.file,
      urlRoot: `${BASE_URL}/${dirOne}`,
      destination: [dirOne, dirTwo],
    });
    res.send(imageUploadUrl);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

// res.status(200).json({
//   ...req.file,
//   url: imageUploadUrl,
// });

// const filename = path.basename(req.file.originalname, path.extname(req.file.originalname));
