// middlewares/multer.js
import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // allow images only
  if (/^image\/(jpg|jpeg|png|webp)$/.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const limits = { fileSize: 5 * 1024 * 1024 }; // 5 MB limit (adjust as needed)

const upload = multer({ storage, fileFilter, limits });

export default upload;
