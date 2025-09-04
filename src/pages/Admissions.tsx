import { useEffect, useState } from "react";
import InfoCard from "./../components/InfoCard";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json();
}

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

  useEffect(() => {
    (async () => {
      try {
        const [homepage] = await Promise.all([
          fetchJSON<AdmissionContent>(
            `${import.meta.env.BASE_URL}content/admission.json`
          ),
        ]);
        setContent(homepage);
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
    </section>
  );
}
