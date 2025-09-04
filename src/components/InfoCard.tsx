import React from "react";

type CardProps = {
  image: string;
  title: string;
  description: string;
}

const InfoCard : React.FC<CardProps> = ({image, title, description}) =>{
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition md:max-w-[320px]">
      <img src={image} alt={title} className="w-10 h-10 mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default InfoCard