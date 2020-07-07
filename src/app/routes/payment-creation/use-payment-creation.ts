import { useCallback, useState } from "react";

/**
 * Note: TS does not provide a more detailed shape for payment response details,
 * thus we're doing this manually. This might vary in different browsers, though.
 */
export interface PaymentResponseDetails {
  cardNumber: string;
  cardSecurityCode: string;
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
  billingAddress: {
    // Note: These values did not seem to be `null` or `undefined`,
    // but just providing empty strings instead.
    addressLine: string[];
    city: string;
    country: string;
    dependentLocality: string;
    organization: string;
    phone: string;
    postalCode: string;
    recipient: string;
    region: string;
    sortingCode: string;
  };
}

interface PaymentCreation {
  available: boolean;
  paymentResponseDetails: PaymentResponseDetails | null;
  createPaymentRequest: () => void;
}

function buildSupportedPaymentMethodData() {
  // Example supported payment methods:
  return [
    {
      supportedMethods: "basic-card",
      data: {
        supportedNetworks: ["visa", "mastercard"],
        supportedTypes: ["debit", "credit"],
      },
    },
  ];
}

function buildShoppingCartDetails() {
  // Hardcoded for demo purposes:
  return {
    id: "order-123",
    displayItems: [
      {
        label: "Example item",
        amount: { currency: "USD", value: "1.00" },
      },
    ],
    total: {
      label: "Total",
      amount: { currency: "USD", value: "1.00" },
    },
  };
}

export function usePaymentCreation(): PaymentCreation {
  const [
    paymentResponseDetails,
    setPaymentResponseDetails,
  ] = useState<PaymentResponseDetails | null>(null);

  const createPaymentRequest = useCallback(async () => {
    const request = new PaymentRequest(
      buildSupportedPaymentMethodData(),
      buildShoppingCartDetails()
    );

    const canMakePayment = await request.canMakePayment();
    if (!canMakePayment) {
      // TODO: Update state, show toast depending on it.
      console.warn("Cannot make payment");
    }

    try {
      const paymentResponse = await request.show();
      // For this demo: Mark the response as successful immediately.
      await paymentResponse.complete("success");

      // TODO: Set as stateful response, react in view to it (smarter than now, of course).
      setPaymentResponseDetails(paymentResponse.details);
      console.warn(paymentResponse);
    } catch (error) {
      console.warn("Payment request failed due to:", error);
    }
  }, []);

  return {
    available: !!PaymentRequest,
    createPaymentRequest,
    paymentResponseDetails,
  };
}
