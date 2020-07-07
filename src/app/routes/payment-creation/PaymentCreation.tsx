import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { usePaymentCreation } from "./use-payment-creation";

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
          <FormattedMessage id="paymentCreation.infoText" />
          {!available && (
            <div>
              <FormattedMessage id="paymentCreation.unavailable" />
            </div>
          )}
          {available && (
            <div>
              <Button color="primary" onClick={createPaymentRequest}>
                <FormattedMessage id="paymentCreation.startDemo" />
              </Button>
            </div>
          )}
          {paymentResponseDetails && (
            <pre>{JSON.stringify(paymentResponseDetails, null, 4)}</pre>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default PaymentCreation;
