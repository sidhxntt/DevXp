"use client";
import React, { useEffect, useState } from 'react';
import { AppleCardsCarouselDemo } from "@/Components/Carousal";
import get_dataPreprocessing_data from "@/Content/machine-learning/DataPreprocessing";
import get_algorithms_data from '@/Content/machine-learning/Algorithms';


const Page = () => {
  const [dataPreprocessing_data, set_DataPreprocessing_data] = useState([]);
  const [algorithms_data, set_Algorithms_data]= useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetched_dataPreprocessing_data = await get_dataPreprocessing_data();
      const fetched_algorithms_data = await get_algorithms_data();
      set_DataPreprocessing_data(fetched_dataPreprocessing_data);
      set_Algorithms_data(fetched_algorithms_data);
    };
    fetchData();
  }, []);

  return (
    <>
      <AppleCardsCarouselDemo name={"Data Preprocessing"} data={dataPreprocessing_data} />
      <AppleCardsCarouselDemo name={"Supervised Algorithms"} data={dataPreprocessing_data} />
      <AppleCardsCarouselDemo name={"Unsupervised Algorithms"} data={algorithms_data} />
    </>
  );
};

export default Page;
