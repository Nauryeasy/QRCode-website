import React, { useState } from 'react';

function ImageUpload() {
  const [image, setImage] = useState(null);

  function handlePaste(event) {
    if (event.clipboardData && event.clipboardData.items) {
      const items = event.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          console.log(blob); // log the blob image to the console
          break;
        }
      }
    }
  }

  function handleFileSelect(event) {
    const file = event.target.files[0];
    console.log(file); // log the blob image to the console
    const url = URL.createObjectURL(file);
    setImage(url);
  }

  function handleCameraClick() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          const video = document.createElement('video');
          video.srcObject = stream;
          video.onloadedmetadata = () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            const url = canvas.toDataURL('image/png');
            setImage(url);
            video.srcObject.getTracks().forEach(track => track.stop());
          };
          video.play();
        })
        .catch(error => console.error(error));
    } else {
      console.error('Cannot access media devices');
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileSelect} />
      <button onClick={handleCameraClick}>Открыть камеру</button>
      <div onPaste={handlePaste} contentEditable={true}></div>
    </div>
  );
}

export default ImageUpload;