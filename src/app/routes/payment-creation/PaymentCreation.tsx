import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import { usePaymentCreation } from "./use-payment-creation";

/**
 * The component below illustrates how to initiate a payment request.
 * Esp. have a look at the values of the "name" property of the used TextFields.
 * Those trigger a payment completion attempt, i.e. if you have already configured
 * a card, your browser will provide an option to fill the form automatically as
 * long as you are in a safe (i.e. HTTPS) environment.
 */
export const PaymentCreation: FC = () => {
  const {
    available,
    createPaymentRequest,
    paymentResponseDetails,
  } = usePaymentCreation();

  return (
    <>
      <Typography variant="h4">
        <FormattedMessage id="nav.paymentCreation" />
      </Typography>
      <Card>
        <CardContent>
          <div>
            <FormattedMessage id="paymentCreation.infoText" />
          </div>
          <div>
            <FormattedMessage id="paymentCreation.infoSubText" />
          </div>

          {!available && (
            <div>
              <FormattedMessage id="paymentCreation.unavailable" />
            </div>
          )}
          {available && (
            <Grid container justify="center" alignItems="center" spacing={2}>
              <Grid item lg={2} sm={12}>
                <TextField
                  margin="dense"
                  label={<FormattedMessage id="paymentCreation.card.name" />}
                  variant="filled"
                  name="cardname"
                  value={paymentResponseDetails?.cardholderName || ""}
                  required
                />
              </Grid>

              <Grid item lg={2} sm={12}>
                <TextField
                  margin="dense"
                  label={<FormattedMessage id="paymentCreation.card.number" />}
                  variant="filled"
                  name="cardnumber"
                  value={paymentResponseDetails?.cardNumber || ""}
                  required
                />
              </Grid>

              <Grid item lg={2} sm={12}>
                <TextField
                  margin="dense"
                  label={
                    <FormattedMessage id="paymentCreation.card.expMonth" />
                  }
                  variant="filled"
                  name="expmonth"
                  value={paymentResponseDetails?.expiryMonth || ""}
                  required
                />
              </Grid>

              <Grid item lg={2} sm={12}>
                <TextField
                  margin="dense"
                  label={<FormattedMessage id="paymentCreation.card.expYear" />}
                  variant="filled"
                  name="expyear"
                  value={paymentResponseDetails?.expiryYear || ""}
                  required
                />
              </Grid>

              <Grid item lg={12} sm={12}>
                <Button color="primary" onClick={createPaymentRequest}>
                  <FormattedMessage id="paymentCreation.startDemo" />
                </Button>
              </Grid>
            </Grid>
          )}
          {paymentResponseDetails && (
            <>
              <FormattedMessage id="paymentCreation.rawData" />
              <pre>{JSON.stringify(paymentResponseDetails, null, 4)}</pre>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default PaymentCreation;
