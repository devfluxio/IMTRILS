import React from 'react';

interface OrderProgressBarProps {
  current: 'order' | 'payment' | 'success';
}

const steps = [
  { key: 'order', label: 'Order' },
  { key: 'payment', label: 'Payment' },
  { key: 'success', label: 'Order Successful' },
];

export const OrderProgressBar: React.FC<OrderProgressBarProps> = ({ current }) => {
  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-xl mx-auto my-6 select-none">
      {steps.map((step, idx) => {
        const isActive = current === step.key;
        const isCompleted = steps.findIndex(s => s.key === current) > idx;
        return (
          <React.Fragment key={step.key}>
            <div className={`flex flex-col items-center flex-1 min-w-0`}> 
              <div className={`rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm border-2 transition-all
                ${isActive ? 'bg-black text-white border-black shadow-lg' : isCompleted ? 'bg-green-500 text-white border-green-500' : 'bg-gray-200 text-gray-500 border-gray-300'}`}
              >
                {idx + 1}
              </div>
              <span className={`mt-2 text-xs font-medium ${isActive ? 'text-black' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-1 transition-all
                ${isCompleted ? 'bg-green-500' : isActive ? 'bg-black' : 'bg-gray-300'}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
