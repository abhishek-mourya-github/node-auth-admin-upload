const Image = require('../models/Image');
const {uploadToCloudinary} = require('../helpers/cloudinaryHelper');
const fs = require('fs');
const { image } = require('../config/cloudinary');
const { AsyncLocalStorage } = require('async_hooks');
const cloudinary = require('../config/cloudinary');

const uploadImageController = async (req, res) => {
    try {
        
      // check if file is missing in req object
      if(!req.file){
        return res.status(400).json({
            success : false,
            message : "File is required. Please upload an image"
        })
      }

      // upload to cloudinary
      const {url, publicId} = await uploadToCloudinary(req.file.path);

      //store the image url and publicId along with the uploaded user in database
      const newlyUploadedImage = new Image({
        url,
        publicId,
        uploadBy : req.userInfo.userId
      })

      await newlyUploadedImage.save();

      // delete the file from local storage
      // fs.unlinkSync(req.file.path);

      res.status(201).json({
        success : true,
        message : "Image uploaded successfully",
        image : newlyUploadedImage
      })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success : false,
            message : 'Something went wrong'
        })
    }
}

const fetchImagesController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    // after ||, the digit represent how many images you want to display, here it is 1
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page-1) * limit;

    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const totalImage = await Image.countDocuments();
    const totalPages = Math.ceil(totalImage/limit);

    const sortObj = {};
    sortObj[sortBy] = sortOrder

    const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

    if(images){
      res.status(200).json({
        success : true,
        currentPage : page,
        totalPages : totalPages,
        totalImages : totalImage,
        data : images
      });
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success : false,
      message : "Something went wrong! Please try again"
    });
  }
};

const deleteImageController = async (req, res) => {
  try {
    const getCurrentIdofImageToBeDeleted = req.params.id;
    const userId = req.userInfo.userId;

    const image = await Image.findById(getCurrentIdofImageToBeDeleted);

    if(!image){
      return res.status(404).json({
        success : false,
        message : "Image not found"
      })
    }

    // check if this image is uploaded by the current user who is trying to delete this image
    if(image.uploadBy.toString() !== userId){
      return res.status(403).json({
        success : false,
        message : "You are not authorized to delete this image"
      })
    }

    // delete this image from your cloudinary storage
    await cloudinary.uploader.destroy(image.publicId);

    // delete this image from mongoDB 
    await Image.findByIdAndUpdate(getCurrentIdofImageToBeDeleted);
    
    res.status(200).json({
      success : true,
      message : "image deleted successfully"
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success : false,
      message : "Something went wrong! Please try again"
    });
  }
}

module.exports = {
  uploadImageController,
  fetchImagesController,
  deleteImageController
}