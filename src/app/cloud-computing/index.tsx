"use client";
import React, { useEffect, useState } from "react";
import { AppleCardsCarouselDemo } from "@/Components/Carousal";
import {
  //add here
  get_cloudcomputing_data,
  get_AWS_data,

} from "@/Content/CloudComputing";
import GradientCircularProgress from "@/Components/Loader/Loader";


const CloudComputing = () => {
  const [data, setData] = useState({
    //add here
    cloud_computing: [],
    AWS: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          //add here
          cloud_computing,
          AWS,
        ] = await Promise.all([
          //add here
          get_cloudcomputing_data(),
          get_AWS_data(),
        ]);

        setData({
          //add here
          cloud_computing,
          AWS,
        });
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return(
    <div className="flex justify-center items-center h-96">
      <GradientCircularProgress/>
    </div>
  )
  if (error) return <p>{error}</p>;

  return (
    //add here
    <>
      <AppleCardsCarouselDemo
        name="Cloud Computing"
        data={data.cloud_computing}
      />
      <AppleCardsCarouselDemo
        name="AWS"
        data={data.AWS}
      />
    </>
  );
};

export default CloudComputing;
