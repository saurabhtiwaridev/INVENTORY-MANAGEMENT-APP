import multer from "multer";
import path from "path";

const multerStoreConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("public", "images"));
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

export const uploadFile = multer({
  storage: multerStoreConfig,
});
