const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const CloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ANIMALRANCH",
    format: async (request, file) => "jpeg",
    public_id: (request, file) => file.originalname,
  },
});
console.log("🟢 Caricamento su cartella:", "AnimalRanch");
const cloudUpload = multer({ storage: CloudStorage });

module.exports = { cloudUpload };
