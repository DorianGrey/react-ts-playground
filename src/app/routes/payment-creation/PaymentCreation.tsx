import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import Typography from "@material-ui/core/Typography";

export const PaymentCreation: FC = () => {
  return (
    <div>
      <Typography variant="h4">
        <FormattedMessage id="nav.paymentCreation" />
      </Typography>
      <div>
        <FormattedMessage id="paymentCreation.infoText" />
      </div>
    </div>
  );
};

export default PaymentCreation;
