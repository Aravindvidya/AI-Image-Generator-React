import React, { useState, useRef } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/default_image.svg';

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/");
  const inputRef = useRef(null);

const YOUR_ACTUAL_API_KEY= '';

  const generateImage = async () => {
    const prompt = inputRef.current.value.trim();
    if (prompt === "") {
      alert("Please enter a description");
      return;
    }

    try {
      const response = await fetch('https://api.limewire.com/api/image/generation', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer: ${process.env.YOUR_ACTUAL_API_KEY}`, // Replace with your secure method for API key
        },
        body: JSON.stringify({
          prompt,
          n: 1,
          size: "512x512",
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setImageUrl(data.data[0].url); // Update state with the new image URL
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image.Try Again.");
    }
  };

  return (
    <div className='ai-image-generator'>
      <div className="header">AI Image<span> Generator</span></div>
      <div className="img-loading">
        <div className="image">
          <img src={imageUrl === "/" ? default_image : imageUrl} alt="Generated" />
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className='search-input'
          placeholder='Describe what you want to see'
        />
        <div className="generate-btn" onClick={generateImage}>Generate</div>
      </div>
    </div>
  );
};

export default ImageGenerator;






