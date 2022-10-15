const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");
const { RequestError } = require("../../helpers");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file; // абсолютний шлях тимчасового сховища, також при деструктуризації перейменовує "path"
    const updateAvatarSize = await Jimp.read(tempUpload); // змінює розмір та зберігає за допомогою пакету "jimp"
    await updateAvatarSize.resize(250, 250).write(tempUpload);

    const extention = originalname.split(".").pop(); // обрізає назву, щоб була тільки кінцівка
    const filename = `${_id}.${extention}`; // створюємо унікальне ім'я
    const resultUpload = path.join(avatarsDir, filename); // створює локально абсолютний шлях
    await fs.rename(tempUpload, resultUpload); // перемістили з тимчасового сховища до постійного
    const avatarURL = path.join("avatars", filename); // створили відносний шлях до папки "app.use(express.static("public"))"

    await User.findByIdAndUpdate(_id, { avatarURL }); // відправили у відповідь
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw RequestError(401, "Not authorized");
  }
};

module.exports = updateAvatar;
