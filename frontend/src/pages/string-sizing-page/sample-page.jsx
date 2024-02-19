import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  Paper,
  Box,
  Button,
  InputAdornment,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { useFormik } from 'formik';

const ModuleParametersTable = () => {
  const formik = useFormik({
    initialValues: {
      moduleParamDet: {
        solarModule: '',
        shortCircuitCurrent: '',
        openCircuitVoltage: '',
        ratedPower: '',
        tempCoefficientIsc: '',
        tempCoefficientVoc: '',
        tempCoefficient: ''
      },
      inverterParamDet: {
        inverter: '',
        acNominalPower: '',
        numberOfInverters: '',
        dcStartVoltage: '',
        dcMaximumVoltage: '',
        dcMpptRangeLowerLimit: '',
        dcMpptRangeUpperLimit: ''
      },
      weatherDetails: {
        recordLowAmbientTemperature: '',
        stcCellTemperature: '',
        mediumCellTemperature: '',
        maximumCellTemperature: ''
      }
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:4000/api/master/updateParameter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            parameterID: null,
            projectID: 2,
            moduleParamDet: values.moduleParamDet,
            inverterParamDet: values.inverterParamDet,
            weatherParamDet: values.weatherDetails,
            stringSizingDet: null,
            actionType: 1
          })
        });
        if (!response.ok) {
          throw new Error('Failed to submit form data');
        }
        alert('Form data submitted successfully');
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting form data');
      }
    }
  });

  const handleFormChange = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
    console.log(formik.values);
  };
  const generateRows = (numberOfRows) => {
    const rows = [];
    for (let i = 0; i < numberOfRows; i++) {
      rows.push(
        <TableRow key={i}>
          <TableCell>Inverter {i + 1}</TableCell>
          <TableCell align="center">
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              type="number"
              value={formik.values.inverterParamDet.numberOfInverters}
              onChange={(event) => {
                formik.setFieldValue(
                  `inverterParamDet.numberOfInverters`,
                  event.target.value
                );
              }}
            />
          </TableCell>
          <TableCell align="center">
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              type="number"
              // Add onChange and value props to bind the TextField to formik values
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              value={formik.values.inverterParamDet.numberOfInverters}
            />
          </TableCell>
          <TableCell align="center">100 kW</TableCell>
        </TableRow>
      );
    }
    return rows;
  };
  return (
    <Grid container spacing={2}>
      {/* Module Parameters Form */}
      <Grid item xs={12} md={4}>
        <Typography variant="h5" gutterBottom sx={{ mb: 0, backgroundColor: '#343a40', color: 'white', padding: '6px', textAlign: 'center' }}>
          Module Parameters
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="moduleParamDet.solarModule"
              name="moduleParamDet.solarModule"
              label="Solar Module"
              variant="outlined"
              value={formik.values.moduleParamDet.solarModule}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="moduleParamDet.shortCircuitCurrent"
              name="moduleParamDet.shortCircuitCurrent"
              label="Short-circuit current (Isc)"
              variant="outlined"
              value={formik.values.moduleParamDet.shortCircuitCurrent}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">A</InputAdornment>,
              }}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="moduleParamDet.openCircuitVoltage"
              name="moduleParamDet.openCircuitVoltage"
              label="Open-circuit voltage (Voc)"
              variant="outlined"
              value={formik.values.moduleParamDet.openCircuitVoltage}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">V</InputAdornment>,
              }}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="moduleParamDet.ratedPower"
              name="moduleParamDet.ratedPower"
              label="Rated power (Pmpp)"
              variant="outlined"
              value={formik.values.moduleParamDet.ratedPower}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">W</InputAdornment>,
              }}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="moduleParamDet.tempCoefficientIsc"
              name="moduleParamDet.tempCoefficientIsc"
              label="Temp coefficient Isc"
              variant="outlined"
              value={formik.values.moduleParamDet.tempCoefficientIsc}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">%/C</InputAdornment>,
              }}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="moduleParamDet.tempCoefficientVoc"
              name="moduleParamDet.tempCoefficientVoc"
              label="Temp coefficient Voc"
              variant="outlined"
              value={formik.values.moduleParamDet.tempCoefficientVoc}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">%/C</InputAdornment>,
              }}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="moduleParamDet.tempCoefficient"
              name="moduleParamDet.tempCoefficient"
              label="Temp coefficient Pmpp"
              variant="outlined"
              value={formik.values.moduleParamDet.tempCoefficient}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">%/C</InputAdornment>,
              }}
            />
          </Box>
        </form>
      </Grid>

      {/* Inverter Parameters Form */}
      <Grid item xs={12} md={4}>
        <Typography variant="h5" gutterBottom sx={{ mb: 0, backgroundColor: '#343a40', color: 'white', padding: '6px', textAlign: 'center' }}>
          Inverter Parameters
        </Typography>
        <form onSubmit={formik.handleSubmit}>
        <Box sx={{ p: 2 }}>
            <TextField
              required
              id="inverterParamDet.inverter"
              name="inverterParamDet.inverter"
              label="Inverter"
              variant="outlined"
              value={formik.values.inverterParamDet.inverter}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="inverterParamDet.acNominalPower"
              name="inverterParamDet.acNominalPower"
              label="AC nominal power"
              variant="outlined"
              value={formik.values.inverterParamDet.acNominalPower}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">kW</InputAdornment>,
              }}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="inverterParamDet.numberOfInverters"
              name="inverterParamDet.numberOfInverters"
              label="Number of inverters"
              variant="outlined"
              value={formik.values.inverterParamDet.numberOfInverters}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">Nos</InputAdornment>,
              }}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="inverterParamDet.dcStartVoltage"
              name="inverterParamDet.dcStartVoltage"
              label="DC start voltage"
              variant="outlined"
              value={formik.values.inverterParamDet.dcStartVoltage}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">V</InputAdornment>,
              }}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="inverterParamDet.dcMaximumVoltage"
              name="inverterParamDet.dcMaximumVoltage"
              label="DC maximum voltage"
              variant="outlined"
              value={formik.values.inverterParamDet.dcMaximumVoltage}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">V</InputAdornment>,
              }}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="inverterParamDet.dcMpptRangeLowerLimit"
              name="inverterParamDet.dcMpptRangeLowerLimit"
              label="DC MPPT range lower limit"
              variant="outlined"
              value={formik.values.inverterParamDet.dcMpptRangeLowerLimit}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">V</InputAdornment>,
              }}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="inverterParamDet.dcMpptRangeUpperLimit"
              name="inverterParamDet.dcMpptRangeUpperLimit"
              label="DC MPPT range upper limit"
              variant="outlined"
              value={formik.values.inverterParamDet.dcMpptRangeUpperLimit}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">V</InputAdornment>,
              }}
            />
          </Box>
        </form>
      </Grid>

      {/* Weather Details Form */}
      <Grid item xs={12} md={4}>
        <Typography variant="h5" gutterBottom sx={{ mb: 0, backgroundColor: '#343a40', color: 'white', padding: '6px', textAlign: 'center' }}>
          Weather Details
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="weatherDetails.recordLowAmbientTemperature"
              name="weatherDetails.recordLowAmbientTemperature"
              label="Record low ambient temperature"
              variant="outlined"
              value={formik.values.weatherDetails.recordLowAmbientTemperature}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="weatherDetails.stcCellTemperature"
              name="weatherDetails.stcCellTemperature"
              label="STC cell temperature"
              variant="outlined"
              value={formik.values.weatherDetails.stcCellTemperature}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="weatherDetails.mediumCellTemperature"
              name="weatherDetails.mediumCellTemperature"
              label="Medium cell temperature"
              variant="outlined"
              value={formik.values.weatherDetails.mediumCellTemperature}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="weatherDetails.maximumCellTemperature"
              name="weatherDetails.maximumCellTemperature"
              label="Maximum cell temperature"
              variant="outlined"
              value={formik.values.weatherDetails.maximumCellTemperature}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <Button variant="contained" type="submit">Submit</Button>
          </Box>
        </form>
      </Grid>

    {/* String and Module Details Table */}
    <Grid item xs={12} md={8}>
        <Paper elevation={3} style={{ padding: '20px', border: '1px solid #ccc', alignContent: 'center' }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={4}>
                    String and Module Details
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Inverter</TableCell>
                  <TableCell align="center">No of String</TableCell>
                  <TableCell align="center">No of Module</TableCell>
                  <TableCell align="center">Capacity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {generateRows(formik.values.inverterParamDet.numberOfInverters)}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
    
  );
};

export default ModuleParametersTable;
