"use client";
import React, { useEffect, useState } from "react";
import { AppleCardsCarouselDemo } from "@/Components/Carousal";
import {
  //add here
  get_supervisedAlgorithmsDeepLearning_data,

} from "@/Content/deep-learning";
import GradientCircularProgress from "@/Components/Loader/Loader";


const DeepLearning = () => {
  const [data, setData] = useState({
    //add here
    supervised: [],

  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          //add here
          supervised,
        ] = await Promise.all([
          //add here
          get_supervisedAlgorithmsDeepLearning_data(),

        ]);

        setData({
          //add here
          supervised
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
        name="Supervised Learning"
        data={data.supervised}
      />
    </>
  );
};

export default DeepLearning;
