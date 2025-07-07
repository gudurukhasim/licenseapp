import express from 'express';
import multer from 'multer';
import { submitApplication } from '../controllers/submissionController';

const router = express.Router();
const upload = multer({ dest: 'uploads/', limits: { fileSize: 2 * 1024 * 1024 } });

router.post('/', upload.fields([
  { name: 'aadhaar', maxCount: 1 },
  { name: 'photograph', maxCount: 1 },
  { name: 'signature', maxCount: 1 },
]), submitApplication);

export default router;
