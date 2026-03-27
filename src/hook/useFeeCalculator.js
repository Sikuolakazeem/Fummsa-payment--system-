import { useMemo } from 'react';

export function useFeeCalculator(amount = 0, taxIncluded = false) {
  return useMemo(() => {
    const base = Number(amount) || 0;
    const taxRate = 0.075;
    const stampDutyRate = 0.02;

    let tax = 0;
    let stampDuty = 0;
    let balance = 0;

    if (taxIncluded) {
      const net  = base / (1 + taxRate + stampDutyRate);
      tax        = net * taxRate;
      stampDuty  = net * stampDutyRate;
      balance    = net; 
    } else {
      tax        = base * taxRate;
      stampDuty  = base * stampDutyRate;
      balance    = base + tax + stampDuty;
    }

    return { tax, stampDuty, balance };
  }, [amount, taxIncluded]);
}