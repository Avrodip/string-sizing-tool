import { useState } from 'react';
import { Button, Step, Stepper, StepLabel, Stack, Typography, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import ModuleParameterTable from './string-sizing-form';
import StringTable from '../string-sizing-page/string-table';
import LineDiagram from './line-diagram';
import batteryImage from '../resources/battery 1.png';
const steps = ['Parameter Details', 'String Sizing Analysis', 'Design'];

function getStepContent(step, formikValues, handleFormikChange) {
  switch (step) {
    case 0:
      return <ModuleParameterTable onFormikChange={handleFormikChange} />;
    case 1:
      return <StringTable formikValues={formikValues} />;
    case 2:
        return <LineDiagram numberOfLines={5} imageSrc={batteryImage} />;
    default:
      throw new Error('Unknown step');
  }
}

const BasicWizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formikValues, setFormikValues] = useState(null);

  const handleFormikChange = (values) => {
    setFormikValues(values);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Grid>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
        {getStepContent(activeStep, formikValues, handleFormikChange)}
        <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
              Back
            </Button>
          )}
          <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
            {activeStep === steps.length - 1 ? 'submit' : 'Next'}
          </Button>
        </Stack>
      </>
    </Grid>
  );
};

export default BasicWizard;
