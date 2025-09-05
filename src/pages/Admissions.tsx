import { useEffect, useState } from "react";
import InfoCard from "./../components/InfoCard";
import StepsAccordion from "./../components/StepsAccordion";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json();
}

type Step = {
  step: number;
  title: string;
  description: string;
};

type AdmissionSteps = {
  steps: Step[];
};

type Principle = {
  "image": string;
  "title": string;
  "description": string;
}

type AdmissionContent = {
  "admission_header": string;
  "admission_description": string;
  "admission_image": string;
  "admission_brochure": string
  "principles" : Principle[]
}

export default function Admissions() {
  const [content, setContent] = useState<AdmissionContent | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [homepage, admissionSteps] = await Promise.all([
          fetchJSON<AdmissionContent>(
            `${import.meta.env.BASE_URL}content/admission.json`
          ),
          fetchJSON<AdmissionSteps>(
            `${import.meta.env.BASE_URL}content/admission_steps.json`
          ),
        ]);
        setContent(homepage);
        setSteps(admissionSteps.steps);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <section className="flex flex-col gap-[5rem]">
      <section className="flex flex-col items-center justify-center md:flex-row md:min-h-[628px] bg-[#F3F6FCFF] gap-5">
        <div className="px-5">
          <img
            className="md:min-w-[600px] md:min-h-[300px]"
            src={`${import.meta.env.BASE_URL}${content?.admission_image.replace(
              /^\//,
              ""
            )}`}
            alt=""
          />
        </div>
        <div className="flex flex-col items-start justify-between gap-5 px-5">
          <h1 className="text-3xl md:text-5xl font-merriweather md:max-w-[400px]">
            {content?.admission_header}
          </h1>
          <p className="md:max-w-[400px]">{content?.admission_description}</p>
          <div className="flex flex-row gap-5 justify-center pb-5 w-full">
            <button
              className="flex-1 px-5 text-sm py-3 md:py-4 bg-[#376FC8FF] border border-[#376FC8FF] text-white rounded cursor-pointer 
            hover:bg-transparent hover:border-[#376FC8FF hover:text-[#376FC8FF]"
            >
              Apply Now
            </button>
            <button
              className="flex-1 px-5 text-sm py-3 md:py-4 bg-white text-black rounded cursor-pointer border border-white 
            hover:border-[#376FC8FF] hover:text-[#376FC8FF]"
            >
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center py-5 my-5 px-5 gap-5">
        <h1 className="text-3xl md:text-5xl font-merriweather mb-20">
          Our Guiding Principles
        </h1>
        <section className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {content?.principles.map((cv, id) => {
            return (
              <InfoCard
                key={id}
                image={`${import.meta.env.BASE_URL}${cv.image.replace(
                  /^\//,
                  ""
                )}`}
                title={cv.title}
                description={cv.description}
              />
            );
          })}
        </section>
      </section>

      <section className="flex flex-col items-center justify-center py-10 my-10 px-5 gap-5 bg-[#FAFAFBFF]">
        <div className="flex flex-col md:flex-row my-20 gap-10">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition md:max-w-lg">
            <h3 className="text-xl font-semibold mb-5 self-start font-merriweather text-[#376FC8FF]">
              Required Documents
            </h3>
            <ul className="px-5">
              <li className="text-gray-600 text-sm text-left mb-5">
                Official High School Transcript (for college applicants) or
                Elementary/Junior High School Report Card (for high school
                applicants)
              </li>
              <li className="text-gray-600 text-sm text-left mb-5">
                Official High School Transcript (for college applicants) or
                Elementary/Junior High School Report Card (for high school
                applicants)
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition md:max-w-lg">
            <h3 className="text-xl font-semibold mb-5 self-start font-merriweather text-[#376FC8FF]">
              Eligibility Criteria
            </h3>
            <ul className="px-5">
              <li className="text-gray-600 text-sm text-left">
                Official High School Transcript (for college applicants) or
                Elementary/Junior High School Report Card (for high school
                applicants)
              </li>
            </ul>
          </div>
        </div>
        <div className="flex w-full">
          {steps.length > 0 && <StepsAccordion steps={steps} />}
        </div>
      </section>

      <section className="flex flex-col items-center justify-center bg-transparent my-5 py-5 gap-20">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center bg-[#376FC8FF] rounded rounded-lg my-5 py-20 px-20 gap-5 md:min-w-3xl">
            <h1 className="font-merriweather text-white text-center md:text-5xl text-3xl mb-10">
              Ready to Join Our Community?
            </h1>
            <p className="font-montserrat text-white text-center text-sm max-w-lg">
              Take the first step towards a transformative education. Our
              admissions team is here to guide you through every stage.
            </p>
          </div>
        </div>
        <div className="my-20 py-20">
          <h1 className="font-merriweather text-[#376FC8FF] text-center md:text-5xl text-3xl mb-10">
            Frequently Asked Question
          </h1>
        </div>
      </section>
    </section>
  );
}
