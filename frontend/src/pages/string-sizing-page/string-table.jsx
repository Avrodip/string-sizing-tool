import React from 'react';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid, Stack, Button } from '@mui/material';

function StringTable({ formikValues, NextStep, prevStep }) {
  console.log('formik', formikValues);
  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 41; i++) {
      const lowestValue = (
        i *
        formikValues.moduleParamDet.openCircuitVoltage *
        (1 + (formikValues.moduleParamDet.tempCoefficientVoc / 100) * (formikValues.weatherDetails.recordLowAmbientTemperature.Tcell - 25))
      ).toFixed(0);
      const stcValue = (
        i *
        formikValues.moduleParamDet.openCircuitVoltage *
        (1 + (formikValues.moduleParamDet.tempCoefficientVoc / 100) * (formikValues.weatherDetails.stcCellTemperature.Tcell - 25))
      ).toFixed(0);

      const mediumValue = (
        i *
        formikValues.moduleParamDet.openCircuitVoltage *
        (1 + (formikValues.moduleParamDet.tempCoefficientVoc / 100) * (formikValues.weatherDetails.mediumCellTemperature.Tcell - 25))
      ).toFixed(0);
      const maxValue = (
        i *
        formikValues.moduleParamDet.openCircuitVoltage *
        (1 + (formikValues.moduleParamDet.tempCoefficientVoc / 100) * (formikValues.weatherDetails.maximumCellTemperature.Tcell - 25))
      ).toFixed(0);
      rows.push(
        <TableRow key={i}>
          <TableCell>{i}</TableCell>

          <TableCell
            align="center"
            sx={{
              backgroundColor:
                Number(lowestValue) > Number(formikValues.inverterParamDet.dcMaximumVoltage)
                  ? 'red'
                  : Number(lowestValue) > Number(formikValues.inverterParamDet.dcMpptRangeUpperLimit) &&
                    Number(lowestValue) <= Number(formikValues.inverterParamDet.dcMaximumVoltage)
                  ? 'orange'
                  : Number(lowestValue) >= Number(formikValues.inverterParamDet.dcMpptRangeLowerLimit) &&
                    Number(lowestValue) <= Number(formikValues.inverterParamDet.dcMpptRangeUpperLimit)
                  ? 'green'
                  : 'inherit'
            }}
          >
            {lowestValue}
            {' V'}
          </TableCell>

          <TableCell
            align="center"
            sx={{
              backgroundColor:
                Number(stcValue) > Number(formikValues.inverterParamDet.dcMaximumVoltage)
                  ? 'red'
                  : Number(stcValue) > Number(formikValues.inverterParamDet.dcMpptRangeUpperLimit) &&
                    Number(stcValue) <= Number(formikValues.inverterParamDet.dcMaximumVoltage)
                  ? 'orange'
                  : Number(stcValue) >= Number(formikValues.inverterParamDet.dcMpptRangeLowerLimit) &&
                    Number(stcValue) <= Number(formikValues.inverterParamDet.dcMpptRangeUpperLimit)
                  ? 'green'
                  : 'inherit'
            }}
          >
            {stcValue}
            {' V'}
          </TableCell>

          <TableCell
            align="center"
            sx={{
              backgroundColor:
                Number(mediumValue) > Number(formikValues.inverterParamDet.dcMaximumVoltage)
                  ? 'red'
                  : Number(mediumValue) > Number(formikValues.inverterParamDet.dcMpptRangeUpperLimit) &&
                    Number(mediumValue) <= Number(formikValues.inverterParamDet.dcMaximumVoltage)
                  ? 'orange'
                  : Number(mediumValue) >= Number(formikValues.inverterParamDet.dcMpptRangeLowerLimit) &&
                    Number(mediumValue) <= Number(formikValues.inverterParamDet.dcMpptRangeUpperLimit)
                  ? 'green'
                  : 'inherit'
            }}
          >
            {mediumValue}
            {' V'}
          </TableCell>

          <TableCell
            align="center"
            sx={{
              backgroundColor:
                Number(maxValue) > Number(formikValues.inverterParamDet.dcMaximumVoltage)
                  ? 'red'
                  : Number(maxValue) > Number(formikValues.inverterParamDet.dcMpptRangeUpperLimit) &&
                    Number(maxValue) <= Number(formikValues.inverterParamDet.dcMaximumVoltage)
                  ? 'orange'
                  : Number(maxValue) >= Number(formikValues.inverterParamDet.dcMpptRangeLowerLimit) &&
                    Number(maxValue) <= Number(formikValues.inverterParamDet.dcMpptRangeUpperLimit)
                  ? 'green'
                  : 'inherit'
            }}
          >
            {maxValue}
            {' V'}
          </TableCell>
        </TableRow>
      );
    }
    return rows;
  };

  return (
    <Grid container direction="column">
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
                <TableCell style={{ border: '1px solid #ccc', width: '12%' }}>String Length</TableCell>
                <TableCell align="center" style={{ border: '1px solid #ccc' }}>
                  Lowest({formikValues.weatherDetails.recordLowAmbientTemperature.Tcell})
                </TableCell>
                <TableCell align="center" style={{ border: '1px solid #ccc' }}>
                  STC({formikValues.weatherDetails.stcCellTemperature.Tcell})
                </TableCell>
                <TableCell align="center" style={{ border: '1px solid #ccc' }}>
                  Medium({formikValues.weatherDetails.mediumCellTemperature.Tcell})
                </TableCell>
                <TableCell align="center" style={{ border: '1px solid #ccc' }}>
                  Maximum({formikValues.weatherDetails.maximumCellTemperature.Tcell})
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{generateRows()}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Grid container justifyContent="flex-end" sx={{ mt: 2, mr: 2 }}>
        <Stack direction="row" gap={2}>
          <Button sx={{ mt: 2.5 }} color="error" onClick={prevStep}>
            Back
          </Button>
          <Button variant="contained" sx={{ mt: 2.5 }} type="submit" onClick={NextStep}>
            Next
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default StringTable;
