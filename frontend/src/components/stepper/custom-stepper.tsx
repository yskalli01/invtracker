import { Box, Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useStepper } from ".";
import { ReactNode } from "react";



type CustomStepperProps = {
    steps : string[],
    children : ReactNode,
    buttonText : string,
    clickFunction : () => void;
}


export function CustomStepper ({steps, children, buttonText, clickFunction} : CustomStepperProps){
    const stepper = useStepper();
    const childrenArray = Array.isArray(children) ? children : [children];
    const currentStepContent = childrenArray[stepper.activeStep];

    const handleClickFunction = ()=>{
        clickFunction();
        stepper.handleReset();
    }

    return(
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={stepper.activeStep}>
                {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                    optional?: React.ReactNode;
                } = {};
                if (stepper.isStepOptional(index)) {
                    labelProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                    );
                }
                if (stepper.isStepSkipped(index)) {
                    stepProps.completed = false;
                }
                return (
                    <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
                })}
            </Stepper>


            

            <Box sx={{ mt: 2 }}>
                {currentStepContent}
            </Box>


            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                color="inherit"
                disabled={stepper.activeStep === 0}
                onClick={stepper.handleBack}
                sx={{ mr: 1 }}
                >
                Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {stepper.isStepOptional(stepper.activeStep) && (
                <Button color="inherit" onClick={stepper.handleSkip} sx={{ mr: 1 }}>
                    Skip
                </Button>
                )}
                <Button onClick={stepper.activeStep === steps.length - 1 ? handleClickFunction : stepper.handleNext}>
                    {stepper.activeStep === steps.length - 1 ? buttonText : 'Next'}
                </Button>
            </Box>
                
        </Box>
    )
}