import { diskStorage } from 'multer';
import * as fs from 'fs';

export const BASE_UPLOAD_FOLDER = './dist/images/';

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const userId = req.body.userId;
      if (!fs.existsSync(`${BASE_UPLOAD_FOLDER}${userId}/`)) {
        fs.mkdirSync(`${BASE_UPLOAD_FOLDER}${userId}/`);
      }
      cb(null, `${BASE_UPLOAD_FOLDER}${userId}/`);
    },
    filename: (req, { originalname, mimetype }, cb) => {
      const fileExtension: string = mimetype.match(/(?:\/)(\w+)/)[1];
      cb(null, `${originalname}.${fileExtension}`);
    },
  }),
};
