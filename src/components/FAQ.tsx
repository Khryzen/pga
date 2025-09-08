import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQAccordion: React.FC = () => {
  const [faq, setFaq] = useState<FAQItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}content/faq.json`)
      .then((res) => res.json())
      .then((data) => setFaq(data.faq || []))
      .catch((err) => console.error("Failed to load FAQ:", err));
  }, []);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto rounded-lg bg-transparent">
      <h1 className="font-merriweather text-[#376FC8FF] text-center md:text-5xl text-3xl mb-10">
        Frequently Asked Question
      </h1>

      {faq.map((item, i) => {
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
              <span>{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 transform transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-[#376FC8FF]" : "text-gray-500"
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-6 py-4 text-gray-700 leading-relaxed font-montserrat text-sm">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
