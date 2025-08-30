import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type HomePageContent = {
  headline: string;
  subheadline: string;
  description: string;
  image: string;
  greetings: {
    headline: string;
    description: string;
  };
};

type CoreValue = {
  title: string;
  image: string;
  description: string;
};

type SchoolContent = {
  mission: string;
  vision: string;
  goals: string;
  core_values: CoreValue[];
};

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json();
}



export default function HomePage(){

  const [content, setContent] = useState<HomePageContent| null >(null);
  const [schoolContent, setSchoolContent] = useState<SchoolContent | null > (null);

  useEffect(() => {
    (async () => {
      try {
        const [homepage, school] = await Promise.all([
          fetchJSON<HomePageContent>(
            `${import.meta.env.BASE_URL}content/homepage.json`
          ),
          fetchJSON<SchoolContent>(
            `${import.meta.env.BASE_URL}content/school.json`
          ),
        ]);
        setContent(homepage);
        setSchoolContent(school);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  // Skeleton loader
  if (!content) {
    return (
      <section className="flex items-center justify-center w-full">
        <div className="min-w-full flex flex-row animate-pulse">
          <div className="flex-1 px-10 py-30">
            <div className="flex flex-col gap-5 px-5">
              <div className="h-10 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-10 bg-gray-400 rounded w-40 mt-3"></div>
            </div>
          </div>
          <div className="flex-1 px-10 py-10 flex items-center justify-center">
            <div className="h-64 w-80 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center lg:w-full md:min-h-[788px] bg-[#F2F6FDFF]"
      >
        <div className="min-w-full flex flex-col lg:flex-row">
          <div className="flex-1 lg:px-10 py-30 mx-auto">
            <div className="flex flex-col gap-5 px-5">
              <motion.h1
                className="lg:text-7xl text-5xl font-bold align-left font-montserrat"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {content.headline}
              </motion.h1>
              <motion.h3
                className="lg:text-2xl text-xl font-semibold font-montserrat"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {content.subheadline}
              </motion.h3>
              <motion.p
                className="text-s font-open-sans"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {content.description}
              </motion.p>
              <motion.button
                className="self-start px-5 py-2 bg-[#588de9] text-white rounded"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                View all events
              </motion.button>
            </div>
          </div>
          <div className="flex-1 lg:px-10 py-10 px-5 flex items-center justify-center mx-auto">
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              src={`${import.meta.env.BASE_URL}${content.image.replace(
                /^\//,
                ""
              )}`}
              alt="image"
              className="rounded-[20px] md:max-w-sm px-5"
            />
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="my-20 px-5 flex flex-col items-center justify-center w-full lg:px-15 lg:gap-[5rem] md:min-h-[400px] md:px-5 md:gap-5"
      >
        <h1 className="font-montserrat lg:text-5xl text-3xl font-semibold">
          {content.greetings.headline}
        </h1>
        <p className="text-lg font-open-sans max-w-5xl">
          {content.greetings.description}
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="my-20 py-10 flex flex-col items-center justify-center w-full lg:px-15 lg:gap-[5rem] px-5 gap-5 md:min-h-[400px] bg-[#F2F6FDFF]"
      >
        <h1 className="font-montserrat lg:text-7xl text-3xl font-semibold">
          Our Mission
        </h1>
        <p className="text-lg font-open-sans max-w-5xl">
          {schoolContent?.mission}
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="px-5 mb-10 flex flex-col lg:flex-row  items-center justify-center w-full gap-5 md:min-h-[400px]"
      >
        <div className="flex flex-col items-center justify-center gap-10 md:max-w-3xl mx-auto lg:px-10">
          <h1 className="font-montserrat text-3xl font-semibold">Our Vision</h1>
          <p className="text-s font-open-sans max-w-5xl text-justify">
            {schoolContent?.vision}
          </p>
        </div>
        <div className="flex-col items-center justify-center md:max-w-3xl mx-auto">
          <img
            src={`${import.meta.env.BASE_URL}${content.image.replace(
              /^\//,
              ""
            )}`}
            alt="image"
            className="rounded-[20px] md:max-w-sm px-5"
          />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="my-20 py-10 flex flex-col items-center justify-center w-full lg:px-15 lg:gap-[5rem] px-5 gap-5 md:min-h-[400px] bg-[#FAFAFBFF]"
      >
        <h1 className="font-montserrat text-3xl font-semibold">
          Our Core Values
        </h1>
        <section
          className="grid gap-6 mt-8 justify-center
            grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-3"
        >
          {schoolContent?.core_values.map((cv, idx) => (
            <div
              key={idx}
              className="bg-white shadow rounded-xl p-4 max-w-xs w-full"
            >
              <img src={cv.image} alt={cv.title} className="h-20 mx-auto" />
              <h3 className="text-xl text-center font-semibold mt-4">
                {cv.title}
              </h3>
              <p className="text-gray-600 text-center mt-2">{cv.description}</p>
            </div>
          ))}
        </section>
      </motion.section>
    </>
  );
}