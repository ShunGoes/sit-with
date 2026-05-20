"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/components/store/use-modal-store";
import { Info } from "lucide-react";

interface PaymentCurrencyModalProps {
  onProceed: (isNaira: boolean) => void;
}

export default function PaymentCurrencyModal({
  onProceed,
}: PaymentCurrencyModalProps) {
  const [isNaira, setIsNaira] = useState(false);
  const closeModal = useModalStore((state) => state.closeModal);

  const handleProceed = () => {
    onProceed(isNaira);
    closeModal("payment-currency");
  };

  return (
    <div className="bg-white rounded-[12px] p-8 w-full max-w-md mx-auto shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center text-regular-button">
          <Info size={20} />
        </div>
        <h2 className="text-xl font-bold text-primary-text">
          Payment Currency
        </h2>
      </div>

      <p className="text-secondary-text text-sm mb-8 leading-relaxed">
        Please select your preferred payment currency. If you are paying with a
        Nigerian (Naira) bank card, please check the box below, if not, <strong>Proceed To Payment</strong>
      </p>

      <div
        className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100 mb-8 cursor-pointer hover:bg-slate-100 transition-colors"
        onClick={() => setIsNaira(!isNaira)}
      >
        <input
          type="checkbox"
          id="naira-payment"
          checked={isNaira}
          onChange={(e) => {
            e.stopPropagation();
            setIsNaira(e.target.checked);
          }}
          className="w-5 h-5 rounded border-slate-300 text-regular-button focus:ring-regular-button cursor-pointer"
        />
        <label
          htmlFor="naira-payment"
          className="text-sm font-medium text-primary-text cursor-pointer select-none"
          onClick={(e) => e.stopPropagation()}
        >
          I am paying in Naira (NGN)
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          onClick={handleProceed}
          variant="regular"
          className="w-full py-6 text-base font-semibold rounded-lg"
        >
          Proceed to Payment
        </Button>
        <Button
          onClick={() => closeModal("payment-currency")}
          variant="outline"
          className="w-full py-6 text-base font-semibold text-regular-button border-regular-button rounded-lg"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
