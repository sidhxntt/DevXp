"use client";
import React, { useEffect, useState } from "react";
import { AppleCardsCarouselDemo } from "@/Components/Carousal";
import {
  get_Supervised_algorithms_data,
  get_Unsupervised_algorithms_data,
  get_dataPreprocessing_data,
} from "@/Content/machine-learning";
import GradientCircularProgress from "@/Components/Loader/Loader";


const Page = () => {
  const [data, setData] = useState({
    dataPreprocessing: [],
    supervisedAlgorithms: [],
    unsupervisedAlgorithms: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          dataPreprocessing,
          supervisedAlgorithms,
          unsupervisedAlgorithms,
        ] = await Promise.all([
          get_dataPreprocessing_data(),
          get_Supervised_algorithms_data(),
          get_Unsupervised_algorithms_data(),
        ]);

        setData({
          dataPreprocessing,
          supervisedAlgorithms,
          unsupervisedAlgorithms,
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
    <>
      <AppleCardsCarouselDemo
        name="Data Preprocessing"
        data={data.dataPreprocessing}
      />
      <AppleCardsCarouselDemo
        name="Supervised Algorithms"
        data={data.supervisedAlgorithms}
      />
      <AppleCardsCarouselDemo
        name="Unsupervised Algorithms"
        data={data.unsupervisedAlgorithms}
      />
    </>
  );
};

export default Page;
