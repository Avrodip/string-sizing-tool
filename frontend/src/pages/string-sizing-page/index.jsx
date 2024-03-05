import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { CardContent,Grid,Stepper,Step,StepLabel } from '@mui/material';
import MainCard from 'components/MainCard';
// import { lazy } from 'react';
// import Loadable from 'components/Loadable';
// import { useParams } from 'react-router';
import ModuleParameterTable from './string-sizing-form';
import StringTable from '../string-sizing-page/string-table';
import LineDiagram from './line-diagram';
const stepItems = ['Parameter Details', 'String Sizing Analysis', 'Design'];

function StringSizingForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [projectID,setProjectID]=useState(null);
  const [paramterID,setParamterID]=useState(null);
  const [formikValues, setFormikValues] = useState(null);
    const onFormikChange = (values) => {
    setFormikValues(values);
  };
  // Move to the next step
  const NextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  // Move to the previous step
  const prevStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  // Reset the wizard to its initial state
  const ResetStep = () => {
    setActiveStep(0);
  };
  return (
    <Grid>  
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {stepItems.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ width: '100%' }}>
        <MainCard content={false} title={stepItems[activeStep]}>
          <CardContent>
            {stepItems[activeStep] == 'Parameter Details' && <ModuleParameterTable NextStep={NextStep} onFormikChange={onFormikChange } projectID={projectID} setProjectID={setProjectID} paramterID={paramterID} setParamterID={setParamterID}/>}
            {stepItems[activeStep] == 'String Sizing Analysis' && <StringTable formikValues={formikValues} NextStep={NextStep} prevStep={prevStep} /> }
            {stepItems[activeStep] == 'Design' && <LineDiagram  prevStep={prevStep} formikValues={formikValues} />}
          </CardContent>
        </MainCard>
      </Box>
    </Grid>
  );
}

export default StringSizingForm;
