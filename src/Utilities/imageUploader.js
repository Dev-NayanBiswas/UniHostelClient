import axios from 'axios';

async function imageUploader(file){
    const fileData = new FormData();
    fileData.append("image", file);
    const response = await axios.post(import.meta.env.VITE_IMAGE_URL,fileData);
    const result = await response.data;
    // console.log(result.data.display_url);
  return result.data.display_url;
}

export default imageUploader;
