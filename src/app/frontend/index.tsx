"use client";
import React, { useEffect, useState } from "react";
import { AppleCardsCarouselDemo } from "@/Components/Carousal";
import {
  // add here
  get_FrontendEssentials_data
} from "@/Content/frontend";
import GradientCircularProgress from "@/Components/Loader/Loader";
import { MappedEntry } from "@/Content/ContentfulDataFetching";

interface DataState {
  // add here
  Frontend_Essentials: MappedEntry[];
}
const Frontend = () => {
  const [data, setData] = useState<DataState>({
    // add here
    Frontend_Essentials: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          // add here
          Frontend_Essentials ,
        ] = await Promise.all([
          // add here
          get_FrontendEssentials_data(),
        ]);

        setData({
          // add here
          Frontend_Essentials: Frontend_Essentials || [],
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
    // add here
    <>
      <AppleCardsCarouselDemo name="Frontend Essentials" data={data.Frontend_Essentials}/>
    </>
  );
};

export default Frontend;
