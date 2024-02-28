import {React,useEffect,useState} from 'react';
import {
  Grid,
  Typography,
  TextField,
  Paper,
  Stack,
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
import axios from 'axios';
import * as yup from 'yup';
const validationSchema = yup.object().shape({
    moduleParamDet: yup.object().shape({
        solarModule: yup.number().required('This field is required'),
        shortCircuitCurrent: yup.number().required('This field is required'),
        openCircuitVoltage: yup.number().required('This field is required'),
        ratedPower: yup.number().required('This field is required'),
        tempCoefficientIsc: yup.number().required('This field is required'),
        tempCoefficientVoc: yup.number().required('This field is required'),
        tempCoefficientPmpp: yup.number().required('This field is required')
    }),
    inverterParamDet: yup.object().shape({
        inverter: yup.number().required('This field is required'),
        inverters: yup.array().of(yup.object().shape({
            numberOfStrings: yup.number().required('This field is required'),
            numberOfModules: yup.number().required('This field is required')
        })),
        acNominalPower: yup.number().required('This field is required'),
        numberOfInverters: yup.number().required('This field is required'),
        dcStartVoltage: yup.number().required('This field is required'),
        dcMaximumVoltage: yup.number().required('This field is required'),
        dcMpptRangeLowerLimit: yup.number().required('This field is required'),
        dcMpptRangeUpperLimit: yup.number().required('This field is required')
    }),
    weatherDetails: yup.object().shape({
        recordLowAmbientTemperature: yup.object().shape({
            Tcell: yup.number().required('This field is required'),
            Voc: yup.number().required('This field is required'),
            Isc: yup.number().required('This field is required'),
            Pmpp: yup.number().required('This field is required')
        }),
        stcCellTemperature: yup.object().shape({
            Tcell: yup.number().required('This field is required'),
            Voc: yup.number().required('This field is required'),
            Isc: yup.number().required('This field is required'),
            Pmpp: yup.number().required('This field is required')
        }),
        mediumCellTemperature: yup.object().shape({
            Tcell: yup.number().required('This field is required'),
            Voc: yup.number().required('This field is required'),
            Isc: yup.number().required('This field is required'),
            Pmpp: yup.number().required('This field is required')
        }),
        maximumCellTemperature: yup.object().shape({
            Tcell: yup.number().required('This field is required'),
            Voc: yup.number().required('This field is required'),
            Isc: yup.number().required('This field is required'),
            Pmpp: yup.number().required('This field is required')
        })
    })
});
const ModuleParametersTable = ({NextStep,onFormikChange }) => {
    const [formData, setFormData] = useState({
        projectID: null,
        projectName: '',
        projectCapacity: '',
        actionType:1
      });
    const [projectID,setprojectID]=useState('');
  const formik = useFormik({
    initialValues: {
        projectName:'',
        projectCapacity:'',
      moduleParamDet: {
        solarModule: '',
        shortCircuitCurrent: '',
        openCircuitVoltage: '',
        ratedPower: '',
        tempCoefficientIsc: '',
        tempCoefficientVoc: '',
        tempCoefficientPmpp: ''
      },
      inverterParamDet: {
        inverter: '',
        inverters: [
            { numberOfStrings: '', numberOfModules: '' },
          ],
        acNominalPower: '',
        numberOfInverters: '',
        dcStartVoltage: '',
        dcMaximumVoltage: '',
        dcMpptRangeLowerLimit: '',
        dcMpptRangeUpperLimit: ''
      },
      weatherDetails: {
        recordLowAmbientTemperature: {
            Tcell: '0',
            Voc: '',
            Isc: '',
            Pmpp: ''
          },
          stcCellTemperature: {
            Tcell: '10',
            Voc: '',
            Isc: '',
            Pmpp: ''
          },
          mediumCellTemperature: {
            Tcell: '55',
            Voc: '',
            Isc: '',
            Pmpp: ''
          },
          maximumCellTemperature: {
            Tcell: '70',
            Voc: '',
            Isc: '',
            Pmpp: ''
          }
      }
    },
    // validationSchema,
    onSubmit: async (values) => {
      console.log('Onsubmit is calling');
      try {
        const responseProject = await axios.post('http://localhost:4000/api/master/updateProject', formData);
        console.log('Response from API:', responseProject.data.data[0].projectID);
        setprojectID(responseProject.data.data[0].projectID);
        const response = await fetch('http://localhost:4000/api/master/updateParameter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            parameterID: null,
            projectID: responseProject.data.data[0].projectID,
            moduleParamDet: values.moduleParamDet,
            inverterParamDet: values.inverterParamDet,
            weatherParamDet: values.weatherDetails,
            stringSizingDet: values.inverterParamDet.inverters,
            actionType: 1
          })
        });
        if (!response.ok) {
          throw new Error('Failed to submit form data');
        }
        alert('Form data submitted successfully');
        NextStep();
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting form data');
      }
    }
  });

  const handleFormChange = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };
  onFormikChange(formik.values);
  const generateRows = (numberOfRows) => {
    // console.log(numberOfRows)
    if (numberOfRows === 0) {
        return (
            <TableRow>
                <TableCell colSpan={4} align="center">No inverters added yet</TableCell>
            </TableRow>
        );
    }

    let totalNumberOfStrings = 0;
    let totalNumberOfModules = 0;
    const rows = [];

    for (let i = 0; i < numberOfRows; i++) {
        const inverter = formik.values.inverterParamDet.inverters[i] || { numberOfStrings: '', numberOfModules: '' };

        // Increment total number of strings and modules
        totalNumberOfStrings += parseInt(inverter.numberOfStrings || 0);
        totalNumberOfModules += parseInt(inverter.numberOfModules || 0);

        rows.push(
            <TableRow key={i}>
                <TableCell>Inv- {i + 1}</TableCell>
                <TableCell align="center">
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={inverter.numberOfStrings}
                        onChange={(event) => {
                            const newInverters = [...formik.values.inverterParamDet.inverters];
                            newInverters[i] = { ...newInverters[i], numberOfStrings: event.target.value };
                            formik.setFieldValue(`inverterParamDet.inverters`, newInverters);
                        }}
                    />
                </TableCell>
                <TableCell align="center">
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={inverter.numberOfModules}
                        onChange={(event) => {
                            const newInverters = [...formik.values.inverterParamDet.inverters];
                            newInverters[i] = { ...newInverters[i], numberOfModules: event.target.value };
                            formik.setFieldValue(`inverterParamDet.inverters`, newInverters);
                        }}
                    />
                </TableCell>
                <TableCell align="center">
                    100 kW
                </TableCell>
            </TableRow>
        );
    }

    // Add total row
    rows.push(
        <TableRow key="total" className="total-row">
            <TableCell>Total</TableCell>
            <TableCell align="center">{totalNumberOfStrings}</TableCell>
            <TableCell align="center">{totalNumberOfModules}</TableCell>
            <TableCell align="center">100 kW</TableCell>
        </TableRow>
    );

    return rows;
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if(e.target.name=='projectName'){
    formik.setFieldValue(`projectName`, e.target.value);
    }
    else{
    formik.setFieldValue(`projectCapacity`, e.target.value);
    }
  };
  
console.log(formik.values);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Send the form data to the API endpoint using Axios
//       console.log("formData",formData);
//       const response = await axios.post('http://localhost:4000/api/master/updateProject', formData);
//       console.log('Response from API:', response.data.data[0].projectID);
//       setprojectID(response.data.data[0].projectID);
      
//     } catch (error) {
//       console.error('Error:', error);
//       // Optionally, handle error response here
//     }
//   };

  useEffect(() => {
    // Calculate and set the value for Voc based on ratedPower when moduleParamDet changes
    formik.setFieldValue(
      'weatherDetails.recordLowAmbientTemperature.Voc',
      (formik.values.moduleParamDet.openCircuitVoltage * (1 + (formik.values.moduleParamDet.tempCoefficientVoc / 100) * (formik.values.weatherDetails.recordLowAmbientTemperature.Tcell - 25))).toFixed(0)
    );
    formik.setFieldValue(
        'weatherDetails.stcCellTemperature.Voc',
        (formik.values.moduleParamDet.openCircuitVoltage * (1 + (formik.values.moduleParamDet.tempCoefficientVoc / 100) * (formik.values.weatherDetails.stcCellTemperature.Tcell - 25))).toFixed(1)
      );

      formik.setFieldValue(
        'weatherDetails.mediumCellTemperature.Voc',
        (formik.values.moduleParamDet.openCircuitVoltage * (1 + (formik.values.moduleParamDet.tempCoefficientVoc / 100) * (formik.values.weatherDetails.mediumCellTemperature.Tcell - 25))).toFixed(1)
      );
      formik.setFieldValue(
        'weatherDetails.maximumCellTemperature.Voc',
        (formik.values.moduleParamDet.openCircuitVoltage * (1 + (formik.values.moduleParamDet.tempCoefficientVoc / 100) * (formik.values.weatherDetails.maximumCellTemperature.Tcell - 25))).toFixed(1)
      );


     //ISC
     formik.setFieldValue(
        'weatherDetails.recordLowAmbientTemperature.Isc',
        (formik.values.moduleParamDet.shortCircuitCurrent * (1 + (formik.values.moduleParamDet.tempCoefficientIsc / 100) * (formik.values.weatherDetails.recordLowAmbientTemperature.Tcell - 25))).toFixed(0)
      );
      formik.setFieldValue(
        'weatherDetails.stcCellTemperature.Isc',
        (formik.values.moduleParamDet.shortCircuitCurrent * (1 + (formik.values.moduleParamDet.tempCoefficientIsc / 100) * (formik.values.weatherDetails.stcCellTemperature.Tcell - 25))).toFixed(0)
      );
      formik.setFieldValue(
        'weatherDetails.mediumCellTemperature.Isc',
        (formik.values.moduleParamDet.shortCircuitCurrent * (1 + (formik.values.moduleParamDet.tempCoefficientIsc / 100) * (formik.values.weatherDetails.mediumCellTemperature.Tcell - 25))).toFixed(0)
      );
      formik.setFieldValue(
        'weatherDetails.maximumCellTemperature.Isc',
        (formik.values.moduleParamDet.shortCircuitCurrent * (1 + (formik.values.moduleParamDet.tempCoefficientIsc / 100) * (formik.values.weatherDetails.maximumCellTemperature.Tcell - 25))).toFixed(0)
      );

      //Pmpp
      formik.setFieldValue(
        'weatherDetails.recordLowAmbientTemperature.Pmpp',
        (formik.values.moduleParamDet.ratedPower * (1 + (formik.values.moduleParamDet.tempCoefficientPmpp / 100) * (formik.values.weatherDetails.recordLowAmbientTemperature.Tcell - 25))).toFixed(0)
      );
      formik.setFieldValue(
        'weatherDetails.stcCellTemperature.Pmpp',
        (formik.values.moduleParamDet.ratedPower * (1 + (formik.values.moduleParamDet.tempCoefficientPmpp / 100) * (formik.values.weatherDetails.stcCellTemperature.Tcell - 25))).toFixed(0)
      );
      formik.setFieldValue(
        'weatherDetails.mediumCellTemperature.Pmpp',
        (formik.values.moduleParamDet.ratedPower * (1 + (formik.values.moduleParamDet.tempCoefficientPmpp / 100) * (formik.values.weatherDetails.mediumCellTemperature.Tcell - 25))).toFixed(0)
      );
      formik.setFieldValue(
        'weatherDetails.maximumCellTemperature.Pmpp',
        (formik.values.moduleParamDet.ratedPower * (1 + (formik.values.moduleParamDet.tempCoefficientPmpp / 100) * (formik.values.weatherDetails.maximumCellTemperature.Tcell - 25))).toFixed(0)
      );
  }, [formik.values.moduleParamDet,formik.values.weatherDetails]); // Add moduleParamDet as dependency
  return (
    <Grid component='form' noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
     <Grid container spacing={1} sx={{ border: '1px solid #e0e0e0' }}>
      {/* Project Name */}
      <Grid item xs={12} md={2}>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="projectName"
              name="projectName"
              label="Project Name"
              variant="outlined"
              value={formData.projectName}
              onChange={handleChange}
            />
          </Box>
      </Grid>

      {/* Project Capacity */}
      <Grid item xs={12} md={2}>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="projectCapacity"
              name="projectCapacity"
              label="Project Capacity"
              variant="outlined"
              value={formData.projectCapacity}
              onChange={handleChange}
            />
          </Box>
      </Grid>
    </Grid>

    <Grid container spacing={2}>
        
      {/* Module Parameters Form */}
      <Grid item xs={12} md={3}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ mb: 0, backgroundColor: '#343a40', color: 'white', padding: '6px', textAlign: 'center' }}
        >
          Module Parameters
        </Typography>
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
                endAdornment: <InputAdornment position="end">A</InputAdornment>
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
                endAdornment: <InputAdornment position="end">V</InputAdornment>
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
                endAdornment: <InputAdornment position="end">W</InputAdornment>
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
                endAdornment: <InputAdornment position="end">%/C</InputAdornment>
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
                endAdornment: <InputAdornment position="end">%/C</InputAdornment>
              }}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              required
              id="moduleParamDet.tempCoefficientPmpp"
              name="moduleParamDet.tempCoefficientPmpp"
              label="Temp coefficient Pmpp"
              variant="outlined"
              value={formik.values.moduleParamDet.tempCoefficientPmpp}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">%/C</InputAdornment>
              }}
            />
          </Box>
      </Grid>

      {/* Inverter Parameters Form */}
      <Grid item xs={12} md={3}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ mb: 0, backgroundColor: '#343a40', color: 'white', padding: '6px', textAlign: 'center' }}
        >
          Inverter Parameters
        </Typography>
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
                endAdornment: <InputAdornment position="end">kW</InputAdornment>
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
                endAdornment: <InputAdornment position="end">Nos</InputAdornment>
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
                endAdornment: <InputAdornment position="end">V</InputAdornment>
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
                endAdornment: <InputAdornment position="end">V</InputAdornment>
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
                endAdornment: <InputAdornment position="end">V</InputAdornment>
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
                endAdornment: <InputAdornment position="end">V</InputAdornment>
              }}
            />
          </Box>
      </Grid>

      {/* Weather Details Form */}
      <Grid item xs={12} md={6}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ mb: 0, backgroundColor: '#343a40', color: 'white', padding: '6px', textAlign: 'center' }}
        >
          Weather Details
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: '10px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Temperature Effects</TableCell>
                <TableCell align="center">Tcell</TableCell>
                <TableCell align="center">Voc</TableCell>
                <TableCell align="center">Isc</TableCell>
                <TableCell align="center">Pmpp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Record low ambient temperature</TableCell>
                <TableCell align="center">
                  <TextField
                    required
                    id="weatherDetails.recordLowAmbientTemperature.Tcell"
                    name="weatherDetails.recordLowAmbientTemperature.Tcell"
                    variant="outlined"
                    value={formik.values.weatherDetails.recordLowAmbientTemperature.Tcell}
                    onChange={handleFormChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    required
                    id="weatherDetails.recordLowAmbientTemperature.Voc"
                    name="weatherDetails.recordLowAmbientTemperature.Voc"
                    variant="outlined"
                    value={formik.values.weatherDetails.recordLowAmbientTemperature.Voc}
                    onChange={handleFormChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    disabled={true}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    required
                    id="weatherDetails.recordLowAmbientTemperature.Isc"
                    name="weatherDetails.recordLowAmbientTemperature.Isc"
                    variant="outlined"
                    onChange={handleFormChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    disabled={true}
                    value={formik.values.weatherDetails.recordLowAmbientTemperature.Isc}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    required
                    id="weatherDetails.recordLowAmbientTemperature.Pmpp"
                    name="weatherDetails.recordLowAmbientTemperature.Pmpp"
                    variant="outlined"
                    onChange={handleFormChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    disabled={true}
                    value={formik.values.weatherDetails.recordLowAmbientTemperature.Pmpp}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>STC cell temperature</TableCell>
                <TableCell align="center">
                  <TextField
                    required
                    id="weatherDetails.stcCellTemperature.Tcell"
                    name="weatherDetails.stcCellTemperature.Tcell"
                    variant="outlined"
                    value={formik.values.weatherDetails.stcCellTemperature.Tcell}
                    onChange={handleFormChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    required
                    id="weatherDetails.stcCellTemperature.Voc"
                    name="weatherDetails.stcCellTemperature.Voc"
                    variant="outlined"
                    onChange={handleFormChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    disabled={true}
                    value={formik.values.weatherDetails.stcCellTemperature.Voc}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    required
                    id="weatherDetails.stcCellTemperature.Isc"
                    name="weatherDetails.stcCellTemperature.Isc"
                    variant="outlined"
                    onChange={handleFormChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    disabled={true}
                    value={formik.values.weatherDetails.stcCellTemperature.Isc}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    required
                    id="weatherDetails.stcCellTemperature.Pmpp"
                    name="weatherDetails.stcCellTemperature.Pmpp"
                    variant="outlined"
                    onChange={handleFormChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    disabled={true}
                    value={formik.values.weatherDetails.stcCellTemperature.Pmpp}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Medium Cell temperature</TableCell>
                <TableCell align="center">
                  <TextField
                    required
                    id="weatherDetails.mediumCellTemperature.Tcell"
                    name="weatherDetails.mediumCellTemperature.Tcell"
                    variant="outlined"
                    value={formik.values.weatherDetails.mediumCellTemperature.Tcell}
                    onChange={handleFormChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    required
                    id="weatherDetails.mediumCellTemperature.Voc"
                    name="weatherDetails.mediumCellTemperature.Voc"
                    variant="outlined"
                    onChange={handleFormChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    disabled={true}
                    value={formik.values.weatherDetails.mediumCellTemperature.Voc}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    required
                    id="weatherDetails.mediumCellTemperature.Isc"
                    name="weatherDetails.mediumCellTemperature.Isc"
                    variant="outlined"
                    onChange={handleFormChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    disabled={true}
                    value={formik.values.weatherDetails.mediumCellTemperature.Isc}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    required
                    id="weatherDetails.mediumCellTemperature.Pmpp"
                    name="weatherDetails.mediumCellTemperature.Pmpp"
                    variant="outlined"
                    onChange={handleFormChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    disabled={true}
                    value={formik.values.weatherDetails.mediumCellTemperature.Pmpp}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Maximum Cell temperature</TableCell>
                <TableCell align="center">
                  <TextField
                    required
                    id="weatherDetails.maximumCellTemperature.Tcell"
                    name="weatherDetails.maximumCellTemperature.Tcell"
                    variant="outlined"
                    value={formik.values.weatherDetails.maximumCellTemperature.Tcell}
                    onChange={handleFormChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    required
                    id="weatherDetails.maximumCellTemperature.Voc"
                    name="weatherDetails.maximumCellTemperature.Voc"
                    variant="outlined"
                    onChange={handleFormChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    disabled={true}
                    value={formik.values.weatherDetails.maximumCellTemperature.Voc}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    required
                    id="weatherDetails.maximumCellTemperature.Isc"
                    name="weatherDetails.maximumCellTemperature.Isc"
                    variant="outlined"
                    onChange={handleFormChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    disabled={true}
                    value={formik.values.weatherDetails.maximumCellTemperature.Isc}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    required
                    id="weatherDetails.maximumCellTemperature.Pmpp"
                    name="weatherDetails.maximumCellTemperature.Pmpp"
                    variant="outlined"
                    onChange={handleFormChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    disabled={true}
                    value={formik.values.weatherDetails.maximumCellTemperature.Pmpp}
                  />
                </TableCell>
              </TableRow>
              {/* Add similar rows for other temperature conditions */}
            </TableBody>
          </Table>
        </TableContainer>
      {/* </Grid> */}

      {/* String and Module Details Table */}
      {/* <Grid item xs={12} md={6}> */}
      <Grid>
  <TableContainer>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell align="center" colSpan={4} sx={{backgroundColor:'#343A40', color:'white'}}>
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
      {formik.values.inverterParamDet.numberOfInverters && formik.values.inverterParamDet.numberOfInverters !== '' && formik.values.inverterParamDet.numberOfInverters !== 0 && (
        <TableBody>{generateRows(formik.values.inverterParamDet.numberOfInverters)}</TableBody>
      )}
      {/* {console.log(formik.values.inverterParamDet.numberOfInverters)} */}
      {!formik.values.inverterParamDet.numberOfInverters || formik.values.inverterParamDet.numberOfInverters == '' && (
        <TableBody>
          <TableRow>
            <TableCell colSpan={4} align="center">No of Inverters not selected</TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  </TableContainer>
</Grid>

      </Grid>
    </Grid>
    <Grid xs={12} sx={{ mx: 2 }}>
                <Stack direction="row" justifyContent="flex-end" gap={2}>
                    <Button sx={{ mt: 2.5 }} color='error' >Back</Button>
                    <Button variant="contained" sx={{ mt: 2.5 }} type='submit'>Next</Button>
                </Stack>
            </Grid>
    </Grid>
  );
};

export default ModuleParametersTable;
