import React, { FC } from "react";
import { FormattedDate } from "react-intl";

import { useCurrentDateTime } from "../hooks/useCurrentDateTime";

const CurrentTime: FC = () => {
  const [dateTime] = useCurrentDateTime();
  return (
    <div>
      <FormattedDate
        value={dateTime}
        year="numeric"
        month="long"
        day="2-digit"
        hour="2-digit"
        minute="2-digit"
        second="2-digit"
      />
    </div>
  );
};

export default CurrentTime;
