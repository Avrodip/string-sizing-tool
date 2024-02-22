import React, { useEffect, useRef } from 'react';

const LineDiagram = ({ numberOfLines, imageSrc }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas before drawing
    context.clearRect(0, 0, width, height);

    // Calculate spacing between lines
    const spacing = width / (numberOfLines + 1);

    // Get the center coordinates of the image
    const image = imageRef.current;
    const imageWidth = image.width;
    console.log("image",image.height)
    const imageHeight = image.height;
    const imageX = (width - imageWidth) / 2;
    const imageY = (height - imageHeight) / 2;

    for (let i = 1; i <= numberOfLines; i++) {
      const x = i * spacing;
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(imageX + imageWidth / 2, imageY + imageHeight / 2);
      context.strokeStyle = 'black';
      context.stroke();
    }
  }, [numberOfLines, imageSrc]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} width={800} height={600} style={{ position: 'absolute', top: 0, left: 0 }} />
      <img ref={imageRef} src={imageSrc} alt="Battery" style={{ display: 'block', margin: 'auto', maxWidth: '100%', maxHeight: '100%' }} />
    </div>
  );
};

export default LineDiagram;
