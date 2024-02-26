import React, { useEffect, useRef } from 'react';
import Union from '../resources/Union.png';

const LineDiagram = ({ formikValues }) => {
  const numberOfLines = formikValues.inverterParamDet.numberOfInverters;
  const canvasRef = useRef(null);
  const imageRef1 = useRef(null);
  const imageRef2 = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    context.clearRect(0, 0, width, height);

    const spacing = width / (numberOfLines + 1);

    const image1 = imageRef1.current;
    const imageWidth1 = image1.width / 2;
    const imageHeight1 = image1.height / 2;
    const imageX1 = (width - imageWidth1) / 4 - 50;
    const imageY1 = (height - imageHeight1) / 2;

    const image2 = imageRef2.current;
    const imageWidth2 = image2.width / 2;
    const imageHeight2 = image2.height / 2;
    const imageX2 = (width - imageWidth2) * (3 / 4) + 50;
    const imageY2 = (height - imageHeight2) / 2;

    for (let i = 1; i <= numberOfLines; i++) {
      const x = i * spacing;
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(imageX1 + imageWidth1, imageY1);
      context.strokeStyle = 'black';
      context.stroke();
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(imageX2 + imageWidth2, imageY2);
      context.strokeStyle = 'black';
      context.stroke();
    }
  }, [numberOfLines]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      <img ref={imageRef1} src={Union} alt="Battery" style={{ position: 'absolute', top: '50%', left: '25%', transform: 'translate(-50%, -50%)', maxWidth: '50%', maxHeight: '50%' }} />
      <img ref={imageRef2} src={Union} alt="Battery" style={{ position: 'absolute', top: '50%', left: '75%', transform: 'translate(-50%, -50%)', maxWidth: '50%', maxHeight: '50%' }} />
    </div>
  );
};

export default LineDiagram;
