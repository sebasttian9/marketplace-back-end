//Elements to upload
import "dotenv/config";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// AWS configuration (replace with your actual credentials)
const s3Client = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION, // Replace with your region if different
  credentials: {
    accessKeyId: process.env.AWS_ACCES_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCES_KEY,
  },
});
const myBucket = process.env.AWS_BUCKET_NAME; // Replace with your bucket name

// Multer configuration
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 3 },
}); // 3 MB limit

// Define the middleware function
const uploadToS3Middleware = async (req, res, next) => {
  try {
    const file = req.file;
    const fileName = file.originalname.replace(/\s/g, "");
    const params = {
      Bucket: myBucket,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const result = await s3Client.send(new PutObjectCommand(params));
    const accessUrl = `https://${myBucket}.s3.${process.env.AWS_S3_BUCKET_REGION}.amazonaws.com/${fileName}`;
    // Add the access URL to the request object for downstream routes
    res.locals.accessUrl = accessUrl;

    next(); // Proceed to the next route handler
  } catch (error) {
    if (error instanceof multer.MulterError) {
      res.status(400).send("Error uploading file: " + error.message);
    } else {
      res.status(500).send("Error: " + error.message);
    }
  }
};

export { upload, uploadToS3Middleware };
