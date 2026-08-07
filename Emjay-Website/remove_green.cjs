const { Jimp } = require('jimp');

async function processImage() {
  try {
    const imagePath = "C:\\Users\\ABHAY\\.gemini\\antigravity\\brain\\f53255d6-babe-491b-8ee0-c85c3bd49fbd\\green_bottle_1779520093503.png";
    const image = await Jimp.read(imagePath);
    
    // Convert to transparent where pixel is green
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // Chroma key green: green is high, red/blue are low
      if (g > 150 && g > r * 1.5 && g > b * 1.5) {
        // Set alpha to 0 for green pixels
        this.bitmap.data[idx + 3] = 0;
      }
    });

    await image.write("e:\\New folder\\Emjay-Website\\public\\bottle_clean.png");
    console.log("Successfully removed background and saved to bottle_clean.png");
  } catch (err) {
    console.error("Error processing image:", err);
  }
}

processImage();
