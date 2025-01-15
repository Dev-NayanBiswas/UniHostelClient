import axios from 'axios';

async function imageUploader(file){
    const fileData = new FormData();
    fileData.append("image", file);
    const response = await axios.post(import.meta.env.VITE_IMAGE_URL,fileData)
  return response?.data?.data?.display_url;
}

export default imageUploader;
