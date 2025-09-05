import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type Step = {
  step: number;
  title: string;
  description: string;
};

type AccordionProps = {
  steps: Step[];
};

const StepsAccordion: React.FC<AccordionProps> = ({ steps }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-lg bg-transparent">
      <h2 className="text-3xl md:text-5xl font-merriweather text-center text-[#376FC8FF] px-6 py-4 mb-10 border-b border-gray-50 bg-transparent">
        Admissions Process
      </h2>

      {steps
        .sort((a, b) => a.step - b.step)
        .map((s, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="border-b border-gray-200 last:border-none">
              <button
                onClick={() => toggle(i)}
                className={`w-full flex justify-between items-center py-3 px-6 text-left text-lg transition font-merriweather ${
                  isOpen
                    ? "bg-blue-50 text-[#376FC8FF] font-semibold"
                    : "text-gray-800"
                }`}
              >
                <span>
                  Step {s.step}: {s.title}
                </span>
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-[#376FC8FF]" : "text-gray-500"
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 py-4 text-gray-700 leading-relaxed font-montserrat text-sm">
                  {s.description}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default StepsAccordion;
