"use client";
import React, { useEffect, useState } from "react";
import { AppleCardsCarouselDemo } from "@/Components/Carousal";
import {
  // add here
  get_ComputerNetworks_data,
  get_BackendEssentials_data,
  get_SystemDesign_data
} from "@/Content/backend";
import GradientCircularProgress from "@/Components/Loader/Loader";
import { MappedEntry } from "@/Content/ContentfulDataFetching";

interface DataState {
  // add here
  Computer_Networks: MappedEntry[];
  Backend_Essentials: MappedEntry[];
  SystemDesign: MappedEntry[]
}

const Backend = () => {
  const [data, setData] = useState<DataState>({
    // add here
    Backend_Essentials: [],
    Computer_Networks: [],
    SystemDesign: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          // add here
          Computer_Networks,
          Backend_Essentials,
          SystemDesign
        ] = await Promise.all([
          // add here
          get_ComputerNetworks_data(),
          get_BackendEssentials_data(),
          get_SystemDesign_data()
        ]);

        setData({
          // add here
          Computer_Networks: Computer_Networks || [],
          Backend_Essentials: Backend_Essentials || [],
          SystemDesign: SystemDesign || []
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
      <AppleCardsCarouselDemo name="Computer Networks" data={data.Computer_Networks}/>
      <AppleCardsCarouselDemo name="Backend Essentials" data={data.Backend_Essentials}/>
      <AppleCardsCarouselDemo name="System Design" data={data.SystemDesign}/>
    </>
  );
};

export default Backend;
