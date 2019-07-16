import axios from 'axios';
import sha1 from 'sha1';

const cloudName = process.env.CLOUDNAME;
const apiSecret = process.env.CLOUD_SECRET;

const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

export default async ({ fileData, tags = 'picture_upload', publicId }) => {
  if (!publicId) {
    throw new Error('Parameter publicId must be provided. Can be the filename');
  }
  if (!process.env.CLOUD_KEY || !process.env.CLOUD_SECRET) {
    throw new Error('Api key and secret are required for signed uploads');
  }

  const timestamp = await ((Date.now() / 1000) | 0).toString();

  // convert an array of tags to a single string
  let tagsForSignature;
  if (Array.isArray(tags)) {
    tagsForSignature = tags.join(',');
  } else if (typeof tags === 'string') {
    tagsForSignature = tags;
  }

  const serializedParamsToSign = `public_id=${publicId}&tags=${tagsForSignature}&timestamp=${timestamp}${apiSecret}`;

  const signature = sha1(serializedParamsToSign);

  let formData = new FormData();

  // Append form with params required for post request
  formData.append('public_id', publicId);
  formData.append('tags', tags);
  formData.append('timestamp', timestamp);
  formData.append('file', fileData);
  formData.append('api_key', process.env.CLOUD_KEY);
  formData.append('signature', signature);

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
