import "./../App.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json();
}

type TeachingFaculty = {
  image: string;
  name: string;
  designation: string;
  description: string;
};

type NonTeachingFaculty = {
  image: string;
  name: string;
  designation: string;
  description: string;
};

type FacultyContent = {
  faculty_header: string
  faculty_description: string
  teaching_header: string
  teaching_description: string
  admin_header: string
  admin_description: string
  teaching_faculty: TeachingFaculty[];
  non_teaching_faculty: NonTeachingFaculty[];
};

export default function Faculty() {
  const [facultyContent, setFacultyContent] = useState<FacultyContent | null>(
    null
  );
  useEffect(() => {
    (async () => {
      try {
        const [faculty] = await Promise.all([
          fetchJSON<FacultyContent>(
            `${import.meta.env.BASE_URL}content/faculty.json`
          ),
        ]);
        setFacultyContent(faculty);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="flex items-start justify-center lg:w-full pt-10"
      >
        <div className="min-w-full flex items-center  flex-col min-h-[200px] gap-5 px-5">
          <h1 className="text-center text-montserrat text-5xl font-bold text-[#588DE9FF] lg:text-7xl">
            {facultyContent?.faculty_header}
          </h1>
          <p className="text-s font-open-sans text-center">
            {facultyContent?.faculty_description}
          </p>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="flex items-start justify-center lg:w-full pt-10"
      >
        <div className="min-w-full flex items-center  flex-col gap-5 px-5">
          <h1 className="text-center text-montserrat text-3xl font-bold text-[#588DE9FF] lg:text-5xl">
            {facultyContent?.teaching_header}
          </h1>
          <p className="text-s font-open-sans text-center">
            {facultyContent?.teaching_description}
          </p>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="my-10 py-10 flex flex-col items-center justify-center w-full lg:px-15 lg:gap-[5rem] px-5 gap-5 md:min-h-[400px]"
      >
        <section
          className="grid gap-6 mt-8 justify-center
            grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-4"
        >
          {facultyContent?.teaching_faculty.map((cv, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 max-w-xs w-full">
              <img
                src={`${import.meta.env.BASE_URL}${cv.image.replace(
                  /^\//,
                  ""
                )}`}
                alt={cv.name}
                className="h-50 w-50 mx-auto rounded-full"
              />
              <h3 className="text-xl text-center font-semibold mt-4">
                {cv.name}
              </h3>
              <h6 className="text-lg text-center mt-4">{cv.designation}</h6>
              <p className="text-gray-600 text-center mt-2">{cv.description}</p>
            </div>
          ))}
        </section>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="flex items-start justify-center lg:w-full pt-10"
      >
        <div className="min-w-full flex items-center  flex-col gap-5 px-5">
          <h1 className="text-center text-montserrat text-3xl font-bold text-[#588DE9FF] lg:text-5xl">
            {facultyContent?.admin_header}
          </h1>
          <p className="text-s font-open-sans text-center">
            {facultyContent?.admin_description}
          </p>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="my-10 py-10 flex flex-col items-center justify-center w-full lg:px-15 lg:gap-[5rem] px-5 gap-5 md:min-h-[400px]"
      >
        <section
          className="grid gap-6 mt-8 justify-center
            grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-4"
        >
          {facultyContent?.non_teaching_faculty.map((cv, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 max-w-xs w-full">
              <img
                src={`${import.meta.env.BASE_URL}${cv.image.replace(
                  /^\//,
                  ""
                )}`}
                alt={cv.name}
                className="h-50 w-50 mx-auto rounded-full"
              />
              <h3 className="text-xl text-center font-semibold mt-4">
                {cv.name}
              </h3>
              <h6 className="text-lg text-center mt-4">{cv.designation}</h6>
              <p className="text-gray-600 text-center mt-2">{cv.description}</p>
            </div>
          ))}
        </section>
      </motion.section>
    </>
  );
}
