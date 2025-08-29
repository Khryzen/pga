import { useEffect, useState } from "react";

type HomePageContent = {
  headline: string;
  subheadline: string;
  description: string;
  image: string;
}

type HomePageGreetings = {
  headline: string;
  description: string;
}

export default function HomePage(){
  const [content, setContent] = useState<HomePageContent| null >(null);
  useEffect(() =>{
    fetch('/content/homepage.json')
    .then((res) => res.json())
    .then(setContent)
  }, []);
  

  const [greetingsContent, setGreetingsContent] = useState<HomePageGreetings | null>(null);
  useEffect(() =>{
    fetch("/content/greetings.json")
      .then((res) => res.json())
      .then(setGreetingsContent);
  }, []);

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
      <section className="flex items-center justify-center w-full md:min-h-[788px] bg-[#F2F6FDFF]">
        <div className="min-w-full flex flex-row">
          <div className="flex-1 px-10 py-30">
            <div className="flex flex-col gap-5 px-5">
              <h1 className="text-6xl font-bold align-left font-montserrat">
                {content.headline}
              </h1>
              <h3 className="text-xl font-semibold font-montserrat">
                {content.subheadline}
              </h3>
              <p className="text-s font-open-sans">
                {content.description}
              </p>
              <button className="self-start px-5 py-2 bg-[#588de9] text-white rounded">
                View all events
              </button>
            </div>
          </div>
          <div className="flex-1 px-10 py-10 flex items-center justify-center">
            <img
              src={content.image}
              alt="image"
              className="max-w-md rounded rounded-[20px]"
            />
          </div>
        </div>
      </section>
      <section className="my-20 flex flex-col items-center justify-center w-full px-5 gap-5 md:min-h-[400px]">
        <h1 className="font-montserrat text-3xl font-semibold">
          {greetingsContent?.headline}
        </h1>
        <p className="text-s font-open-sans max-w-5xl">
          {greetingsContent?.description}
        </p>
      </section>
    </>
  );
}