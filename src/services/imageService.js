import { validateImages } from '../utils/validateImages';

const API_ENDPOINT = process.env.REACT_APP_IMAGE_API;

export const ImageService = {
  async fetchGalleryImages() {
    try {
      const response = await fetch(`${API_ENDPOINT}/gallery`);
      const data = await response.json();
      return await validateImages(data.images);
    } catch (error) {
      throw new Error(`图片加载失败: ${error.message}`);
    }
  },

  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_ENDPOINT}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });
    
    if (!response.ok) throw new Error('上传失败');
    return response.json();
  }
}; 