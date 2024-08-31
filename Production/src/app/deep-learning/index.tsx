"use client";
import React, { useEffect, useState } from "react";
import { AppleCardsCarouselDemo } from "@/Components/Carousal";
import {
  //add here
  get_supervisedAlgorithmsDeepLearning_data,
  get_unsupervisedAlgorithmsDeepLearning_data,
} from "@/Content/deep-learning";
import GradientCircularProgress from "@/Components/Loader/Loader";
import { MappedEntry } from "@/Content/ContentfulDataFetching";

interface DataState {
  //add here
  supervised: MappedEntry[];
  unsupervised: MappedEntry[];
}

const DeepLearning = () => {
  const [data, setData] = useState<DataState>({
    //add here
    supervised: [],
    unsupervised: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [supervised, unsupervised] = await Promise.all([
          //add here
          get_supervisedAlgorithmsDeepLearning_data(),
          get_unsupervisedAlgorithmsDeepLearning_data(),
        ]);

        setData({
          //add here
          supervised: supervised || [],
          unsupervised: unsupervised || [],
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <GradientCircularProgress />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    //add here
    <>
      <AppleCardsCarouselDemo name="Supervised Learning" data={data.supervised}/>
      <AppleCardsCarouselDemo name="Unsupervised Learning" data={data.unsupervised} />
    </>
  );
};

export default DeepLearning;
