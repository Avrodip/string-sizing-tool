// import { useState } from 'react';
// import { Button, Step, Stepper, StepLabel, Stack, Typography, Grid } from '@mui/material';
// import MainCard from 'components/MainCard';
// import ModuleParameterTable from './string-sizing-form';
// import StringTable from '../string-sizing-page/string-table';
// import LineDiagram from './line-diagram';
// import batteryImage from '../resources/battery 1.png';
// const steps = ['Parameter Details', 'String Sizing Analysis', 'Design'];

// function getStepContent(step, formikValues, handleFormikChange) {
//   switch (step) {
//     case 0:
//       return <ModuleParameterTable onFormikChange={handleFormikChange} />;
//     case 1:
//       return <StringTable formikValues={formikValues} />;
//     case 2:
//         return <LineDiagram numberOfLines={5} imageSrc={batteryImage} />;
//     default:
//       throw new Error('Unknown step');
//   }
// }

// const BasicWizard = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [formikValues, setFormikValues] = useState(null);

//   const handleFormikChange = (values) => {
//     setFormikValues(values);
//   };

//   const handleNext = () => {
//     setActiveStep(activeStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep(activeStep - 1);
//   };

//   return (
//     <Grid>
//       <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <>
//         {getStepContent(activeStep, formikValues, handleFormikChange)}
//         <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
//           {activeStep !== 0 && (
//             <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
//               Back
//             </Button>
//           )}
//           <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
//             {activeStep === steps.length - 1 ? 'submit' : 'Next'}
//           </Button>
//         </Stack>
//       </>
//     </Grid>
//   );
// };

// export default BasicWizard;

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
