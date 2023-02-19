const axios = require('axios');
const fs = require('fs');

// Read image file as binary data
const imageData = fs.readFileSync('/path/to/image.jpg');

// Set headers for the request
const headers = {
  'Content-Type': 'image/jpeg', // Replace with the actual mime type of the image
  'Content-Length': imageData.length
};

// Send image using Axios
axios.post('https://example.com/upload-image', imageData, { headers })
  .then(response => {
    console.log('Image uploaded successfully');
  })