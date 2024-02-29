import React, { useRef, useEffect } from 'react';
import Union from '../resources/Union.png';
import Inverter from '../resources/Group 516.png';
import distribution from '../resources/distribution-board 1.png';
import battery from '../resources/battery 1.png';
import tower from '../resources/electric-tower 1.png';

import {Grid,Stack,Button} from '@mui/material';
const LineDiagram = ({ formikValues ,prevStep}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawDiagram(ctx); 
    };

    const drawDiagram = (ctx) => {
      if (formikValues && formikValues.inverterParamDet && formikValues.inverterParamDet.inverters) {
        var startPossition = 100;
        var modulePointDistance = 50;
        var lineDistance = 50;
        var verticalLineDistance = 50;
        var distance = 10;
        var moveToLine = 25;
        var lineTo = 25;
        var stringIndex = 0;
        ctx.font = "10px Arial";
        const UnionImg = new Image();
        UnionImg.src = Union;

        const imgInverter =new Image();
        imgInverter.src=battery

        const grid =new Image();
        grid.src=distribution

        const meter=new Image();
        meter.src= Inverter

        const electricpole=new Image();
        electricpole.src=tower


        for (var js = 0; js < formikValues.inverterParamDet.inverters.length; js++) {
          for (var a = 0; a < formikValues.inverterParamDet.inverters[js].numberOfStrings; a++) {
            distance = (a == 0 && js == 0 ? distance : modulePointDistance + distance);
            moveToLine = (a == 0 && js == 0 ? moveToLine : moveToLine + lineDistance);
            lineTo = (a == 0 && js == 0 ? lineTo : lineTo + lineDistance);
            ctx.fillText('String ' + (stringIndex + 1), 60, distance + 10);
            ctx.fillText(formikValues.inverterParamDet.inverters[js].numberOfModules + ' Nos. Panel', 40, distance + 20);
            ctx.drawImage(UnionImg, startPossition + 10, distance, 28, 30);
            ctx.drawImage(UnionImg, startPossition + 47, distance, 28, 30);
            ctx.drawImage(UnionImg, startPossition + 100, distance, 28, 30);
            ctx.fillText(1, startPossition + 22, distance + 45);
            ctx.fillText(2, startPossition + 58, distance + 45);
            ctx.fillText('-------', startPossition + 75, distance + 45);
            ctx.fillText(formikValues.inverterParamDet.inverters[js].numberOfModules, startPossition + 110, distance + 45);
            ctx.beginPath();
            ctx.moveTo(startPossition + 130, moveToLine);
            ctx.lineTo(startPossition + 200, moveToLine);
            ctx.moveTo(startPossition + 160, moveToLine - 5);
            ctx.lineTo(startPossition + 170, moveToLine);
            ctx.moveTo(startPossition + 160, moveToLine + 5);
            ctx.lineTo(startPossition + 170, moveToLine);
            ctx.stroke();
            stringIndex++;
          }
        }


        // Additional drawing logic
        var verticalLinemoveTo = 25;
        var verticalLinelineTo = 75;
        var horizontalLinemoveTo;
        var horizontalLinelineTo;
        var startPoint;
        var endPoint;
        var panelWp = formikValues.moduleParamDet.ratedPower;
        for (var j = 0; j < formikValues.inverterParamDet.inverters.length; j++) {
          verticalLinemoveTo = (j == 0 ? verticalLinemoveTo : verticalLinemoveTo + verticalLineDistance);
          verticalLinelineTo = (j == 0 ? verticalLinelineTo : verticalLinelineTo + verticalLineDistance);

          var horizontalLineStart;
          var horizontalLineEnd;
          var centerNumber;
          var stringSizeGroup = formikValues.inverterParamDet.inverters[j].numberOfStrings - 1 > 0 ? formikValues.inverterParamDet.inverters[j].numberOfStrings - 1 : 1;

          for (var g = 1; g <= stringSizeGroup; g++) {
            verticalLinemoveTo = (g == 1 && j == 0 ? verticalLinemoveTo : verticalLinemoveTo + verticalLineDistance);
            verticalLinelineTo = (g == 1 && j == 0 ? verticalLinelineTo : verticalLinelineTo + verticalLineDistance);

            if (formikValues.inverterParamDet.inverters[j].numberOfStrings > 1) {
              ctx.moveTo(startPossition + 200, verticalLinemoveTo);
              ctx.lineTo(startPossition + 200, verticalLinelineTo);
            }

            if (g == 1) {
              horizontalLineStart = verticalLinemoveTo;
              horizontalLineEnd = verticalLinelineTo;
            } else {
              horizontalLineEnd = verticalLinelineTo;
            }
          }

          if (formikValues.inverterParamDet.inverters[j].numberOfStrings > 1) {
            centerNumber = horizontalLineStart + (horizontalLineEnd - horizontalLineStart) / 2;
            horizontalLinemoveTo = centerNumber;
            horizontalLinelineTo = centerNumber;
          } else {
            centerNumber = horizontalLineStart;
            horizontalLinemoveTo = horizontalLineStart;
            horizontalLinelineTo = horizontalLineStart;
          }
          ctx.moveTo(startPossition + 200, horizontalLinemoveTo);
            ctx.lineTo(startPossition + 300, horizontalLinelineTo);
            //ctx.stroke();
            ctx.moveTo(startPossition + 260, horizontalLinemoveTo - 5);
            ctx.lineTo(startPossition + 270, horizontalLinelineTo);
            //ctx.stroke();
            ctx.moveTo(startPossition + 260, horizontalLinemoveTo + 5);
            ctx.lineTo(startPossition + 270, horizontalLinelineTo);
            ctx.stroke();
            ctx.fillText("4 Sq.mm DC Cable", startPossition + 203, horizontalLinemoveTo + 15);


            var imgDistance = 50;
            imgDistance = centerNumber - imgDistance;
            ctx.drawImage(imgInverter, startPossition + 290, imgDistance, 80, 80)
            ctx.beginPath();
            var inverterName = formikValues.inverterParamDet.inverter;
            ctx.fillText("Solar Inverter (" + inverterName + " - (" + formikValues.inverterParamDet.acNominalPower + " kW))", startPossition + 260, imgDistance + 110);

            //*logic for draw horizontal line for output*/ 
            ctx.moveTo(startPossition + 360, centerNumber);
            ctx.lineTo(startPossition + 500, centerNumber);
            //ctx.stroke();
            ctx.moveTo(startPossition + 460, horizontalLinemoveTo - 5);
            ctx.lineTo(startPossition + 470, horizontalLinelineTo);
            //ctx.stroke();
            ctx.moveTo(startPossition + 460, horizontalLinemoveTo + 5);
            ctx.lineTo(startPossition + 470, horizontalLinelineTo);
            //ctx.stroke();		

            if (j == 0) {
                startPoint = centerNumber;
            }
            if (j ==  formikValues.inverterParamDet.inverters.length - 1) {
                endPoint = centerNumber;
            }
            ctx.moveTo(startPossition + 500, startPoint);
            ctx.lineTo(startPossition + 500, endPoint);
            ctx.stroke();
            ctx.fillText("Copper/Aluminum", startPossition + 400, horizontalLinemoveTo + 15);
            ctx.fillText("Cable", startPossition + 410, horizontalLinemoveTo + 30);
        
        }
        var solarModuleName = formikValues.moduleParamDet.solarModule;
        ctx.fillText("Solar Module (" + solarModuleName + " - (" + panelWp + " Wp))", startPossition + 10, distance + 75);
        var totalCapacity = formikValues.projectCapacity;
        ctx.fillText("Project Capacity -(" + totalCapacity + " kWp)", startPossition + 10, distance + 100);
        
        var horizintalCenterPoint = startPoint + (endPoint - startPoint) / 2;
        ctx.moveTo(startPossition + 500, horizintalCenterPoint);
        ctx.lineTo(startPossition + 600, horizintalCenterPoint);
        //ctx.stroke();
        ctx.moveTo(startPossition + 545, horizintalCenterPoint - 5);
        ctx.lineTo(startPossition + 555, horizintalCenterPoint);
        //ctx.stroke();
        ctx.moveTo(startPossition + 545, horizintalCenterPoint + 5);
        ctx.lineTo(startPossition + 555, horizintalCenterPoint);
        ctx.stroke();
        //ctx.fillText("4C X 25 Sq.mm", startPossition + 510, horizintalCenterPoint + 15);
        ctx.fillText("Copper/", startPossition + 526    , horizintalCenterPoint + 15);
        ctx.fillText("Aluminum Cable", startPossition + 510, horizintalCenterPoint + 30);



        ctx.drawImage(grid, startPossition + 590, horizintalCenterPoint - verticalLineDistance, 100, 100)
        ctx.beginPath();
        ctx.fillText('AC Distribution Box', startPossition + 600, horizintalCenterPoint - verticalLineDistance + 120);

        ctx.moveTo(startPossition + 800, horizintalCenterPoint);
        ctx.lineTo(startPossition + 680, horizintalCenterPoint);
        //ctx.stroke(); 
        ctx.moveTo(startPossition + 725, horizintalCenterPoint - 5);
        ctx.lineTo(startPossition + 735, horizintalCenterPoint);
        //ctx.stroke();
        ctx.moveTo(startPossition + 725, horizintalCenterPoint + 5);
        ctx.lineTo(startPossition + 735, horizintalCenterPoint);
        ctx.stroke();



         //ctx.fillText("4C X 25 Sq.mm", startPossition + 665, horizintalCenterPoint + 15);
         ctx.fillText("Copper/", startPossition + 710, horizintalCenterPoint + 15);
         ctx.fillText("Aluminum Cable", startPossition + 695, horizintalCenterPoint + 30);
 
         ctx.drawImage(meter, startPossition + 780, horizintalCenterPoint - verticalLineDistance, 100, 100)
         ctx.beginPath();
         ctx.fillText('Energy Meter', startPossition + 800, horizintalCenterPoint - verticalLineDistance + 120);
 
         ctx.moveTo(startPossition + 857, horizintalCenterPoint);
         ctx.lineTo(startPossition + 970, horizintalCenterPoint);
         ctx.stroke();
         ctx.moveTo(startPossition + 915, horizintalCenterPoint - 5);
         ctx.lineTo(startPossition + 925, horizintalCenterPoint);
        //  ctx.stroke();
         ctx.moveTo(startPossition + 915, horizintalCenterPoint + 5);
         ctx.lineTo(startPossition + 925, horizintalCenterPoint);
         ctx.stroke();
         //ctx.fillText("4C X 50 Sq.mm", startPossition + 825, horizintalCenterPoint + 15);
         ctx.fillText("Copper/Aluminum", startPossition + 880, horizintalCenterPoint + 15);
         ctx.fillText("Armoured Cable", startPossition + 885, horizintalCenterPoint + 30);
 
         ctx.drawImage(electricpole, startPossition + 970, horizintalCenterPoint - verticalLineDistance, 100, 100)
         ctx.beginPath();
         ctx.fillText('Utility Grid', startPossition + 1000, horizintalCenterPoint - verticalLineDistance + 120);
      }
    };

    resizeCanvas();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [formikValues]);

  return (
    <Grid>
      <canvas ref={canvasRef}></canvas>
      <Grid xs={12} sx={{ mx: 2 }}>
                <Stack direction="row" justifyContent="flext-end" gap={2}>
                    <Button sx={{ mt: 2.5 }} color='error' onClick={prevStep}>Back</Button>
                </Stack>
            </Grid>
    </Grid>
  );
};

export default LineDiagram;
