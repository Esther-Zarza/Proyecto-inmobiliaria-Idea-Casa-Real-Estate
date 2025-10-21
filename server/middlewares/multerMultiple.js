import multer from 'multer'

function uploadImages(folder) {
  const storage = multer.diskStorage({
    destination: `./public/images/${folder}`,
    filename: function (req, file, callback) {
      const {property_id} = req.params
      callback(null,`${property_id}-` + Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storage }).array("img");

  return upload;
}

export default uploadImages;
