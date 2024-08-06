"use client";
import React, { useEffect, useState } from "react";
import { AppleCardsCarouselDemo } from "@/Components/Carousal";
import {
  //add here
  get_OLTP_data,

} from "@/Content/databases";
import GradientCircularProgress from "@/Components/Loader/Loader";


const Databases = () => {
  const [data, setData] = useState({
    //add here
    OLTP: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          //add here
          OLTP,
        ] = await Promise.all([
          //add here
          get_OLTP_data(),

        ]);

        setData({
          //add here
          OLTP
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
        name="OLTP"
        data={data.OLTP}
      />
    </>
  );
};

export default Databases;
