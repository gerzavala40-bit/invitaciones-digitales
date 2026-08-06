import React from "react";
import { cn } from "@/lib/utils";

interface ProgressStepperProps {
  steps: { title: string; id: string }[];
  currentStep: number;
}

export function ProgressStepper({ steps, currentStep }: ProgressStepperProps) {
  return (
    <div className="flex items-center justify-between w-full mb-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={step.id} className="flex flex-col items-center relative flex-1">
            {index !== 0 && (
              <div className={cn(
                "absolute top-4 left-[-50%] w-full h-[2px] -z-10",
                isCompleted || isActive ? "bg-black" : "bg-gray-200"
              )} />
            )}
            <div className={cn(
              "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-semibold mb-2 bg-white",
              isActive ? "border-black text-black" : 
              isCompleted ? "border-black bg-black text-white" : "border-gray-200 text-gray-400"
            )}>
              {isCompleted ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span className={cn(
              "text-xs font-medium text-center hidden sm:block",
              isActive ? "text-black" : isCompleted ? "text-gray-900" : "text-gray-400"
            )}>
              {step.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
