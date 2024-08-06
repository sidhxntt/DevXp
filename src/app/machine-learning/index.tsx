"use client";
import React, { useEffect, useState } from "react";
import { AppleCardsCarouselDemo } from "@/Components/Carousal";
import {
  get_Supervised_algorithms_data,
  get_Unsupervised_algorithms_data,
  get_dataPreprocessing_data,
  get_Regularization_technqiues_data,
} from "@/Content/machine-learning";
import GradientCircularProgress from "@/Components/Loader/Loader";


const MachineLearning = () => {
  // Initialize the state with correct types
  const [data, setData] = useState({
    dataPreprocessing: [],
    supervisedAlgorithms: [],
    unsupervisedAlgorithms: [],
    regularizationTechnqiues: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          dataPreprocessing,
          supervisedAlgorithms,
          unsupervisedAlgorithms,
          regularizationTechnqiues,
        ] = await Promise.all([
          get_dataPreprocessing_data(),
          get_Supervised_algorithms_data(),
          get_Unsupervised_algorithms_data(),
          get_Regularization_technqiues_data()
        ]);

        setData({
          dataPreprocessing,
          supervisedAlgorithms,
          unsupervisedAlgorithms,
          regularizationTechnqiues,
        });
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <GradientCircularProgress />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

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
      <AppleCardsCarouselDemo
        name="Regularization Techniques"
        data={data.regularizationTechnqiues}
      />
    </>
  );
};

export default MachineLearning;