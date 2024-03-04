import { React, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
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
  projectName: yup.string().required('This field is required'),
  projectCapacity: yup.number().required('This field is required'),
  moduleParamDet: yup.object().shape({
    solarModule: yup.string().required('This field is required'),
    shortCircuitCurrent: yup.number().required('This field is required'),
    openCircuitVoltage: yup.number().required('This field is required'),
    ratedPower: yup.number().required('This field is required'),
    tempCoefficientIsc: yup.number().required('This field is required'),
    tempCoefficientVoc: yup.number().required('This field is required'),
    tempCoefficientPmpp: yup.number().required('This field is required')
  }),
  inverterParamDet: yup.object().shape({
    inverter: yup.string().required('This field is required'),
    inverters: yup.array().of(
      yup.object().shape({
        numberOfStrings: yup.number().required('This field is required'),
        numberOfModules: yup.number().required('This field is required')
      })
    ),
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
const ModuleParametersTable = ({ NextStep, onFormikChange,projectID,setProjectID,paramterID,setParamterID }) => {
  let totalCapacity;
//   const [formData, setFormData] = useState({
//     projectID: null,
//     projectName: '',
//     projectCapacity: '',
//     actionType: 1
//   });
  const formik = useFormik({
    initialValues: {
      projectName: '',
      projectCapacity: '',
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
        inverters: [{ numberOfStrings: '', numberOfModules: '' }],
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
    validationSchema,
    onSubmit: async (values) => {
      console.log('Onsubmit is calling');
      try {
        if (formik.values.projectCapacity < totalCapacity) {
          throw new Error('Total Capacity should be less than Project capacity');
        }
        if(projectID){
            const data={
                projectID: projectID,
                projectName: formik.values.projectName,
                projectCapacity: formik.values.projectCapacity,
                actionType: 2
            }
            const responseProject = await axios.post('http://localhost:4000/api/master/updateProject', data);
            const response = await fetch('http://localhost:4000/api/master/updateParameter', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  parameterID: paramterID,
                  projectID: projectID,
                  moduleParamDet: values.moduleParamDet,
                  inverterParamDet: values.inverterParamDet,
                  weatherParamDet: values.weatherDetails,
                  stringSizingDet: values.inverterParamDet.inverters,
                  actionType: 2
                })
              });
              if (response.ok) {
                NextStep();
                
              }
              else{
                throw new Error('Failed to submit form data');
              }
            
        }
        else{
            const data={
                projectID: null,
                projectName: formik.values.projectName,
                projectCapacity: formik.values.projectCapacity,
                actionType: 1
            }
        const responseProject = await axios.post('http://localhost:4000/api/master/updateProject', data);
        console.log('Response from API:', responseProject.data.data[0].projectID);
        setProjectID(responseProject.data.data[0].projectID);
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
        const responseData = await response.json();
        setParamterID(responseData.data[0].parameterID);

        // setParamterID(response.parameterID);
        toast.success('Form data submitted successfully', {
          onClose: () => NextStep(),
          autoClose: 1000
        });
    }
      } catch (error) {
        toast.error(error.message, {
          autoClose: 2000
        });
      }
    }
  });

//   const handleFormChange = (event) => {
//     formik.setFieldValue(event.target.name, event.target.value);
//   };
// const handleFormChange = (event) => {
//     console.log("event",event);
//     const inputRegex = /^[0-9\b]+$/; // Regex to allow only numbers
//     const inputValue = event.target.value;

//     if (inputValue === '' || inputRegex.test(inputValue)) {
//       formik.setFieldValue(event.target.name, inputValue);
//     }
//   };


const handleFormChange = (event) => {
    const { id, value } = event.target;
    const inputRegex = /^-?[0-9]*(\.[0-9]*)?$/;
    if (id === 'moduleParamDet.solarModule' || id === 'inverterParamDet.inverter' || id === 'projectName') {
      formik.setFieldValue(id, value);
    } else {
      if (value === '' || inputRegex.test(value)) {
        formik.setFieldValue(id, value);
      }
    }
  };
  onFormikChange(formik.values);
  const generateRows = (numberOfRows) => {
    let totalNumberOfStrings = 0;
    let totalNumberOfModules = 0;
    totalCapacity = 0;
    let capacityExceeded = false;

    const rows = [];

    for (let i = 0; i < numberOfRows; i++) {
      const inverter = formik.values.inverterParamDet.inverters[i] || { numberOfStrings: '', numberOfModules: '' };

      const capacity =
        ((parseInt(inverter.numberOfStrings) || 0) * (parseInt(inverter.numberOfModules) || 0) * formik.values.moduleParamDet.ratedPower) /
        1000;

      totalNumberOfStrings += parseInt(inverter.numberOfStrings || 0);
      totalNumberOfModules += parseInt(inverter.numberOfModules || 0);
      totalCapacity += capacity;

      // Check if total capacity exceeds project capacity
      if (totalCapacity > formik.values.projectCapacity) {
        capacityExceeded = true;
      }
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
          <TableCell align="center">{capacity} kW</TableCell>
        </TableRow>
      );
    }

    // Add total row with capacity exceeded error if applicable
    rows.push(
      <TableRow key="total" className={capacityExceeded ? 'total-row error' : 'total-row'}>
        <TableCell>Total</TableCell>
        <TableCell align="center">{totalNumberOfStrings}</TableCell>
        <TableCell align="center">{totalNumberOfModules}</TableCell>
        <TableCell align="center">
          {totalCapacity} kW {capacityExceeded && '(c Exceeded)'}
        </TableCell>
      </TableRow>
    );

    return rows;
  };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (e.target.name == 'projectName') {
//       formik.setFieldValue(`projectName`, e.target.value);
//     } else {
//       formik.setFieldValue(`projectCapacity`, e.target.value);
//     }
//   };

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
    const fetchData = async () => {
        const body={
            projectID:projectID
        }
        try {
            const response =await axios.post('http://localhost:4000/api/master/getParamterByID', body);
            if (response) {
                const responseData = response.data.data[0][0];
            const { projectName, projectCapacity, moduleParamDet, inverterParamDet, weatherParamDet, stringSizingDet } = responseData;
            formik.setValues({
                projectName: projectName,
                projectCapacity: projectCapacity,
                moduleParamDet: moduleParamDet,
                inverterParamDet: inverterParamDet,
                weatherDetails: weatherParamDet,
                stringSizingDet: stringSizingDet
            });
            } else {
                if (response.message.length > 0) {
                    // openSnackbar({
                    //     open: true, message: response.message, variant: 'alert',
                    //     alert: { color: 'error', }
                    // });
                } else {
                    // openSnackbar({
                    //     open: true, message: "Something went wrong", variant: 'alert',
                    //     alert: { color: 'error', }
                    // });
                }
            }
        } catch (error) {
            // openSnackbar({
            //     open: true, message: error, variant: 'alert',
            //     alert: { color: 'error', }
            // });
        }
    };
    if (projectID) {
        fetchData();
    }
}, [projectID]);
  useEffect(() => {
   
    formik.setFieldValue(
      'weatherDetails.recordLowAmbientTemperature.Voc',
      (
        formik.values.moduleParamDet.openCircuitVoltage *
        (1 +
          (formik.values.moduleParamDet.tempCoefficientVoc / 100) * (formik.values.weatherDetails.recordLowAmbientTemperature.Tcell - 25))
      ).toFixed(0)
    );
    formik.setFieldValue(
      'weatherDetails.stcCellTemperature.Voc',
      (
        formik.values.moduleParamDet.openCircuitVoltage *
        (1 + (formik.values.moduleParamDet.tempCoefficientVoc / 100) * (formik.values.weatherDetails.stcCellTemperature.Tcell - 25))
      ).toFixed(1)
    );

    formik.setFieldValue(
      'weatherDetails.mediumCellTemperature.Voc',
      (
        formik.values.moduleParamDet.openCircuitVoltage *
        (1 + (formik.values.moduleParamDet.tempCoefficientVoc / 100) * (formik.values.weatherDetails.mediumCellTemperature.Tcell - 25))
      ).toFixed(1)
    );
    formik.setFieldValue(
      'weatherDetails.maximumCellTemperature.Voc',
      (
        formik.values.moduleParamDet.openCircuitVoltage *
        (1 + (formik.values.moduleParamDet.tempCoefficientVoc / 100) * (formik.values.weatherDetails.maximumCellTemperature.Tcell - 25))
      ).toFixed(1)
    );

    //ISC
    formik.setFieldValue(
      'weatherDetails.recordLowAmbientTemperature.Isc',
      (
        formik.values.moduleParamDet.shortCircuitCurrent *
        (1 +
          (formik.values.moduleParamDet.tempCoefficientIsc / 100) * (formik.values.weatherDetails.recordLowAmbientTemperature.Tcell - 25))
      ).toFixed(0)
    );
    formik.setFieldValue(
      'weatherDetails.stcCellTemperature.Isc',
      (
        formik.values.moduleParamDet.shortCircuitCurrent *
        (1 + (formik.values.moduleParamDet.tempCoefficientIsc / 100) * (formik.values.weatherDetails.stcCellTemperature.Tcell - 25))
      ).toFixed(0)
    );
    formik.setFieldValue(
      'weatherDetails.mediumCellTemperature.Isc',
      (
        formik.values.moduleParamDet.shortCircuitCurrent *
        (1 + (formik.values.moduleParamDet.tempCoefficientIsc / 100) * (formik.values.weatherDetails.mediumCellTemperature.Tcell - 25))
      ).toFixed(0)
    );
    formik.setFieldValue(
      'weatherDetails.maximumCellTemperature.Isc',
      (
        formik.values.moduleParamDet.shortCircuitCurrent *
        (1 + (formik.values.moduleParamDet.tempCoefficientIsc / 100) * (formik.values.weatherDetails.maximumCellTemperature.Tcell - 25))
      ).toFixed(0)
    );

    //Pmpp
    formik.setFieldValue(
      'weatherDetails.recordLowAmbientTemperature.Pmpp',
      (
        formik.values.moduleParamDet.ratedPower *
        (1 +
          (formik.values.moduleParamDet.tempCoefficientPmpp / 100) * (formik.values.weatherDetails.recordLowAmbientTemperature.Tcell - 25))
      ).toFixed(0)
    );
    formik.setFieldValue(
      'weatherDetails.stcCellTemperature.Pmpp',
      (
        formik.values.moduleParamDet.ratedPower *
        (1 + (formik.values.moduleParamDet.tempCoefficientPmpp / 100) * (formik.values.weatherDetails.stcCellTemperature.Tcell - 25))
      ).toFixed(0)
    );
    formik.setFieldValue(
      'weatherDetails.mediumCellTemperature.Pmpp',
      (
        formik.values.moduleParamDet.ratedPower *
        (1 + (formik.values.moduleParamDet.tempCoefficientPmpp / 100) * (formik.values.weatherDetails.mediumCellTemperature.Tcell - 25))
      ).toFixed(0)
    );
    formik.setFieldValue(
      'weatherDetails.maximumCellTemperature.Pmpp',
      (
        formik.values.moduleParamDet.ratedPower *
        (1 + (formik.values.moduleParamDet.tempCoefficientPmpp / 100) * (formik.values.weatherDetails.maximumCellTemperature.Tcell - 25))
      ).toFixed(0)
    );
  }, [formik.values.moduleParamDet, formik.values.weatherDetails]); // Add moduleParamDet as dependency
  return (
    <Grid>
      <Grid component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
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
                value={formik.values.projectName}
                onChange={handleFormChange}
                error={formik.touched.projectName && Boolean(formik.errors.projectName)}
                helperText={formik.touched.projectName && formik.errors.projectName}
              />
            </Box>
          </Grid>
          {/* Project Capacity */}
          <Grid item xs={12} md={3}>
            <Box sx={{ p: 2 }}>
              <TextField
                required
                id="projectCapacity"
                name="projectCapacity"
                label="Project Capacity (kW)"
                variant="outlined"
                value={formik.values.projectCapacity}
                onChange={handleFormChange}
                error={formik.touched.projectCapacity && Boolean(formik.errors.projectCapacity)}
                helperText={formik.touched.projectCapacity && formik.errors.projectCapacity}
                // InputProps={{
                //   endAdornment: <InputAdornment position="end">kW</InputAdornment>
                // }}
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
                error={formik.touched.moduleParamDet?.solarModule && Boolean(formik.errors.moduleParamDet?.solarModule)}
                helperText={formik.touched.moduleParamDet?.solarModule && formik.errors.moduleParamDet?.solarModule}
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
                error={formik.touched.moduleParamDet?.shortCircuitCurrent && Boolean(formik.errors.moduleParamDet?.shortCircuitCurrent)}
                helperText={formik.touched.moduleParamDet?.shortCircuitCurrent && formik.errors.moduleParamDet?.shortCircuitCurrent}
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
                error={formik.touched.moduleParamDet?.openCircuitVoltage && Boolean(formik.errors.moduleParamDet?.openCircuitVoltage)}
                helperText={formik.touched.moduleParamDet?.openCircuitVoltage && formik.errors.moduleParamDet?.openCircuitVoltage}
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
                error={formik.touched.moduleParamDet?.ratedPower && Boolean(formik.errors.moduleParamDet?.ratedPower)}
                helperText={formik.touched.moduleParamDet?.ratedPower && formik.errors.moduleParamDet?.ratedPower}
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
                error={formik.touched.moduleParamDet?.tempCoefficientIsc && Boolean(formik.errors.moduleParamDet?.tempCoefficientIsc)}
                helperText={formik.touched.moduleParamDet?.tempCoefficientIsc && formik.errors.moduleParamDet?.tempCoefficientIsc}
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
                error={formik.touched.moduleParamDet?.tempCoefficientVoc && Boolean(formik.errors.moduleParamDet?.tempCoefficientVoc)}
                helperText={formik.touched.moduleParamDet?.tempCoefficientVoc && formik.errors.moduleParamDet?.tempCoefficientVoc}
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
                error={formik.touched.moduleParamDet?.tempCoefficientPmpp && Boolean(formik.errors.moduleParamDet?.tempCoefficientPmpp)}
                helperText={formik.touched.moduleParamDet?.tempCoefficientPmpp && formik.errors.moduleParamDet?.tempCoefficientPmpp}
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
                error={formik.touched.inverterParamDet?.inverter && Boolean(formik.errors.inverterParamDet?.inverter)}
                helperText={formik.touched.inverterParamDet?.inverter && formik.errors.inverterParamDet?.inverter}
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
                error={formik.touched.inverterParamDet?.acNominalPower && Boolean(formik.errors.inverterParamDet?.acNominalPower)}
                helperText={formik.touched.inverterParamDet?.acNominalPower && formik.errors.inverterParamDet?.acNominalPower}
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
                error={formik.touched.inverterParamDet?.numberOfInverters && Boolean(formik.errors.inverterParamDet?.numberOfInverters)}
                helperText={formik.touched.inverterParamDet?.numberOfInverters && formik.errors.inverterParamDet?.numberOfInverters}
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
                error={formik.touched.inverterParamDet?.dcStartVoltage && Boolean(formik.errors.inverterParamDet?.dcStartVoltage)}
                helperText={formik.touched.inverterParamDet?.dcStartVoltage && formik.errors.inverterParamDet?.dcStartVoltage}
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
                error={formik.touched.inverterParamDet?.dcMaximumVoltage && Boolean(formik.errors.inverterParamDet?.dcMaximumVoltage)}
                helperText={formik.touched.inverterParamDet?.dcMaximumVoltage && formik.errors.inverterParamDet?.dcMaximumVoltage}
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
                error={
                  formik.touched.inverterParamDet?.dcMpptRangeLowerLimit && Boolean(formik.errors.inverterParamDet?.dcMpptRangeLowerLimit)
                }
                helperText={formik.touched.inverterParamDet?.dcMpptRangeLowerLimit && formik.errors.inverterParamDet?.dcMpptRangeLowerLimit}
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
                error={
                  formik.touched.inverterParamDet?.dcMpptRangeUpperLimit && Boolean(formik.errors.inverterParamDet?.dcMpptRangeUpperLimit)
                }
                helperText={formik.touched.inverterParamDet?.dcMpptRangeUpperLimit && formik.errors.inverterParamDet?.dcMpptRangeUpperLimit}
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
                        error={
                          formik.touched.weatherDetails?.recordLowAmbientTemperature?.Tcell &&
                          Boolean(formik.errors.weatherDetails?.recordLowAmbientTemperature?.Tcell)
                        }
                        helperText={
                          formik.touched.weatherDetails?.recordLowAmbientTemperature?.Tcell &&
                          formik.errors.weatherDetails?.recordLowAmbientTemperature?.Tcell
                        }
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
                        error={
                          formik.touched.weatherDetails?.stcCellTemperature?.Tcell &&
                          Boolean(formik.errors.weatherDetails?.stcCellTemperature?.Tcell)
                        }
                        helperText={
                          formik.touched.weatherDetails?.stcCellTemperature?.Tcell &&
                          formik.errors.weatherDetails?.stcCellTemperature?.Tcell
                        }
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
                        error={
                          formik.touched.weatherDetails?.mediumCellTemperature?.Tcell &&
                          Boolean(formik.errors.weatherDetails?.mediumCellTemperature?.Tcell)
                        }
                        helperText={
                          formik.touched.weatherDetails?.mediumCellTemperature?.Tcell &&
                          formik.errors.weatherDetails?.mediumCellTemperature?.Tcell
                        }
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
                        error={
                          formik.touched.weatherDetails?.maximumCellTemperature?.Tcell &&
                          Boolean(formik.errors.weatherDetails?.maximumCellTemperature?.Tcell)
                        }
                        helperText={
                          formik.touched.weatherDetails?.maximumCellTemperature?.Tcell &&
                          formik.errors.weatherDetails?.maximumCellTemperature?.Tcell
                        }
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
                      <TableCell align="center" colSpan={4} sx={{ backgroundColor: '#343A40', color: 'white' }}>
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
                  {formik.values.inverterParamDet.numberOfInverters &&
                    formik.values.inverterParamDet.numberOfInverters !== '' &&
                    formik.values.inverterParamDet.numberOfInverters !== 0 && (
                      <TableBody>{generateRows(formik.values.inverterParamDet.numberOfInverters)}</TableBody>
                    )}
                  {/* {console.log(formik.values.inverterParamDet.numberOfInverters)} */}
                  {!formik.values.inverterParamDet.numberOfInverters ||
                    (formik.values.inverterParamDet.numberOfInverters == '' && (
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={4} align="center">
                            No of Inverters not selected
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ))}
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} sx={{ mx: 2 }}>
          <Stack direction="row" justifyContent="flex-end" gap={2}>
            <Button variant="contained" sx={{ mt: 2.5 }} type="submit">
              Next
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

export default ModuleParametersTable;
