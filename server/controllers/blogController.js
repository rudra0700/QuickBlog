import fs from "fs";
import { imagekitClient } from "../config/imagekit.js";
import { Blog } from "../model/blog.js";

export const blogController = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog,
    );
    const imageFile = req.file;

    if (!title || !description || !category || !isPublished) {
      return res.send({ sucess: false, message: "Missing required fields" });
    }

    const fileBuffer = fs.createReadStream(imageFile.path);

    // file upload to imagekit
    const response = await imagekitClient.files.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blog",
    });

    // optimization through imagekit url transformation
    const optimizedUrlImage = imagekitClient.helper.buildSrc({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      src: response.filePath,
      transformation: [
        { quality: "auto" }, // auto compression
        { format: "webp" }, // convert to modern format
        { width: "1280" }, // width resizing
      ],
    });

    const image = optimizedUrlImage;
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });
    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};
