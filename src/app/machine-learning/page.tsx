"use client";
import React, { useEffect, useState } from 'react';
import { AppleCardsCarouselDemo } from "@/Components/Carousal";
import get_dataPreprocessing_data from "@/Content/machine-learning/DataPreprocessing";

const Page = () => {
  const [dataPreprocessing_data, set_DataPreprocessing_data] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await get_dataPreprocessing_data();
      set_DataPreprocessing_data(fetchedData);
    };
    fetchData();
  }, []);

  return (
    <>
      <AppleCardsCarouselDemo name={"Data Preprocessing"} data={dataPreprocessing_data} />
    </>
  );
};

export default Page;
