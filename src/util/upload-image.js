import axios from 'axios';

const cloudName = process.env.CLOUDNAME;
const uploadPreset = process.env.UPLOAD_PRESET;
const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

export default ({ fileData, tags = 'picture_upload' }) => {
  let formData = new FormData();
  formData.append('file', fileData);
  formData.append('tags', tags);
  formData.append('upload_preset', uploadPreset);
  formData.append('timestamp', Date.now() / 1000);

  return axios
    .post(url, formData)
    .then(response => {
      const { data } = response;
      const imageURL = data.secure_url;
      return imageURL;
    })
    .catch(err => {
      return err.message;
    });
};
