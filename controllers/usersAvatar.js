const HttpError = require("../helpers/HttpError");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const User = require("../service/schemas/user");
const { nanoid } = require("nanoid");

const updateUserAvatar = async (req, res, next) => {
  try {
    const { path: tempUpload, originalname } = req.file;
    const image = await Jimp.read(tempUpload);
    const extension = path.extname(originalname);
    const baseName = path.basename(originalname, extension);
    const newName = `${baseName}-${nanoid()}${extension}`;
    image
      .resize(250, 250) // resize
      .write(tempUpload); // save

    await fs.rename(
      tempUpload,
      path.join(__dirname, "..", "public", "avatars", newName)
    );
    const avatarURL = path.join("avatar", newName);
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL },
      { new: true }
    );
    res.status(200).send(`avatarURL: ${user.avatarURL}`);
  } catch (error) {
    throw HttpError(error.message, 400);
  }
};

module.exports = {
  updateUserAvatar,
};
