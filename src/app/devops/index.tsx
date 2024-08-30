"use client";
import React, { useEffect, useState } from "react";
import { AppleCardsCarouselDemo } from "@/Components/Carousal";
import {
  // add here
  get_OS_data,
  get_DevopsEssentials_data,
  get_DeploymentTechniques_data,
} from "@/Content/devops";
import GradientCircularProgress from "@/Components/Loader/Loader";
import { MappedEntry } from "@/Content/ContentfulDataFetching";

interface DataState {
  // add here
  OS: MappedEntry[];
  Devops_Essentials: MappedEntry[];
  Deployment_Techniques: MappedEntry[];
}

const Devops = () => {
  const [data, setData] = useState<DataState>({
    // add here
    OS: [],
    Devops_Essentials: [],
    Deployment_Techniques: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          // add here
          OS,
          Devops_Essentials,
          Deployment_Techniques,
        ] = await Promise.all([
          // add here
          get_OS_data(),
          get_DevopsEssentials_data(),
          get_DeploymentTechniques_data()
        ]);

        setData({
          // add here
          OS: OS || [],
          Devops_Essentials: Devops_Essentials || [],
          Deployment_Techniques: Deployment_Techniques || [],
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
      <AppleCardsCarouselDemo name="Operating System" data={data.OS}/>
      <AppleCardsCarouselDemo name="Devops Essentials" data={data.Devops_Essentials}/>
      <AppleCardsCarouselDemo name="FullStack Deployment Techniques" data={data.Deployment_Techniques}/>
    </>
  );
};

export default Devops;
