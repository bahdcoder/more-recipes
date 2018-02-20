let apiUrl;

if (window.location.hostname === 'bahdcoder-more-recipes.herokuapp.com') {
  apiUrl = 'https://bahdcoder-more-recipes.herokuapp.com/api/v1';
} else if (window.location.hostname === 'localhost') {
  apiUrl = 'http://localhost:5678/api/v1';
} else {
  apiUrl = 'http://localhost:4080/api/v1';
}
/**
 * Export application wide configurations
 */
export default {
  apiUrl,
  cloudinaryUploadPreset: 'g5ziunzg',
  cloudinaryImageUploadUrl: 'https://api.cloudinary.com/v1_1/bahdcoder/image/upload',
  cloudinaryApiKey: '132255634713478',
  defaultImage: 'http://res.cloudinary.com/bahdcoder/image/upload/v1519099617/ddddd_cmqwxl.png'
};
