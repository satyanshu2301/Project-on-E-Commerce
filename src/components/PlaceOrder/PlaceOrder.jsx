import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import useStyles from './styles';
import Address from './OrderSummary/Address';
import Payment from './OrderSummary/Payment';
import { Link } from 'react-router-dom';
import { commerce } from '../../library/commerce';

const steps = ['Address', 'Payment'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

                setCheckoutToken(token);
            } catch (error) {
                console.log(error);
            }
        }
        generateToken();
    }, [cart]);

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000);
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thankyou for shopping, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order reference no: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Continue Shopping</Button>
        </>
    ) : isFinished ? (
         <>
            <div>
                <Typography variant="h5">Thankyou for shopping!</Typography>
                <Divider className={classes.divider} />
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Continue Shopping</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );
    
    if (error) {
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Continue Shopping</Button>
        </>
    }

    const nextStep = () => setActiveStep((previousActiveStep) => previousActiveStep + 1);
    const backStep = () => setActiveStep((previousActiveStep) => previousActiveStep - 1);

    const Continue = (data) => {
        setShippingData(data);
        nextStep();
    };

    const Form = () => (activeStep === 0 
        ? <Address checkoutToken={checkoutToken} Continue={Continue} />
        : <Payment shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout} timeout={timeout} />);
        
    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Order Summary</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    );
};

export default Checkout;