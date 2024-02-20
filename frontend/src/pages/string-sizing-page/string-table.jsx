import React from 'react';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';

function StringTable({ formikValues }) {
  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 41; i++) {
      rows.push(
        <TableRow key={i}>
          <TableCell>{i}</TableCell>

          <TableCell align="center">{(i * formikValues.moduleParamDet.openCircuitVoltage * (1 + ((formikValues.moduleParamDet.tempCoefficientVoc / 100) * (formikValues.weatherDetails.recordLowAmbientTemperature.Tcell - 25)))).toFixed(0)}</TableCell>


          <TableCell align="center">{(i * formikValues.moduleParamDet.openCircuitVoltage * (1 + ((formikValues.moduleParamDet.tempCoefficientVoc / 100) * (formikValues.weatherDetails.stcCellTemperature.Tcell - 25)))).toFixed(0)}</TableCell>

          <TableCell align="center">{(i * formikValues.moduleParamDet.openCircuitVoltage * (1 + ((formikValues.moduleParamDet.tempCoefficientVoc / 100) * (formikValues.weatherDetails.mediumCellTemperature.Tcell - 25)))).toFixed(0)}</TableCell>

         <TableCell align="center">{(i * formikValues.moduleParamDet.openCircuitVoltage * (1 + ((formikValues.moduleParamDet.tempCoefficientVoc / 100) * (formikValues.weatherDetails.maximumCellTemperature.Tcell - 25)))).toFixed(0)}</TableCell>
        </TableRow>
      );
    }
    return rows;
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#FAFAFB' }}>
              <TableCell colSpan={5} align="center" style={{ border: '1px solid #ccc' }}>
                String Length, String Voltages as Function of Cell Temperatures
              </TableCell>
            </TableRow>
            <TableRow style={{ border: '1px solid #ccc' }}>
              <TableCell style={{ border: '1px solid #ccc' }}>String Length</TableCell>
              <TableCell align="center" style={{ border: '1px solid #ccc' }}>Lowest($)</TableCell>
              <TableCell align="center" style={{ border: '1px solid #ccc' }}>STC</TableCell>
              <TableCell align="center" style={{ border: '1px solid #ccc' }}>Medium</TableCell>
              <TableCell align="center" style={{ border: '1px solid #ccc' }}>Maximum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {generateRows()}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default StringTable;
