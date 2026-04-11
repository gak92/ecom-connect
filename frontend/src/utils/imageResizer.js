/**
 * Utility function to compress and resize an image file on the client side
 * using HTML5 Canvas before uploading.
 * 
 * @param {File} file - The original image file from the input
 * @param {number} maxWidth - Maximum allowed width (default 800)
 * @param {number} maxHeight - Maximum allowed height (default 800)
 * @param {number} quality - JPEG compression quality 0-1 (default 0.8)
 * @returns {Promise<string>} - The base64 data URL of the compressed image
 */
export const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    // 1. Read the file as a DataURL to throw it into an Image object
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        // 2. Calculate aspect ratio safely
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        // 3. Draw the scaled image onto an off-screen canvas
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        
        // Fill pure white background in case of transparent PNG scaling to JPEG
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw image over background
        ctx.drawImage(img, 0, 0, width, height);

        // 4. Return as compressed jpeg data url
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedDataUrl);
      };
      
      img.onerror = (error) => reject(error);
    };
  });
};
