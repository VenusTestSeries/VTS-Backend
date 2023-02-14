// IMAGE UPLOAD ROUTE
import path from 'path';
import express from 'express';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { MONGODB_URI } from '@/config';
import { randomBytes } from 'crypto';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';

const router = express.Router();
const uploadPath = '/uploads';

// Create mongo connection
const connection = mongoose.createConnection(MONGODB_URI);
// Init gfs
let gridfs: Grid.Grid;

connection.once('open', () => {
  // Init stream
  gridfs = Grid(connection.db, mongoose.mongo);
  gridfs.collection('uploads');
});

const storage = new GridFsStorage({
  url: MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

/**
 * Get All Image Stored in DB
 */
router.get(uploadPath, (req, res) => {
  gridfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist',
      });
    }
    // Files exist
    return res.json(files);
  });
});
/**
 * Upload An Image in DB
 */
router.post(uploadPath, upload.single('image'), async (req, res) => {
  const { body, file } = req;
  try {
    res.json({ body, file });
  } catch (error) {
    res.json(error);
  }
});

/**
 * Display single file object
 */
router.get(`${uploadPath}/:filename`, (req, res) => {
  gridfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }
    // File exists
    return res.json(file);
  });
});

/**
 * Display Image
 */
router.get(`${uploadPath}/image/:filename`, (req, res) => {
  gridfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gridfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image',
      });
    }
  });
});

/**
 * Delete file
 */
router.delete(`${uploadPath}/:id`, (req, res) => {
  gridfs.remove({ _id: req.params.id, root: 'uploads' }, err => {
    if (err) {
      return res.status(404).json({ err: err });
    }
  });
});

export default router;
