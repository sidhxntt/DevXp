"use client";
import React, { useEffect, useState } from 'react';
import { AppleCardsCarouselDemo } from "@/Components/Carousal";
import getdata from "@/Content/machine-learning/DataCleaning";

const Page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getdata();
      setData(fetchedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <AppleCardsCarouselDemo name={"Data Preprocessing"} data={data} />
    </>
  );
};

export default Page;
