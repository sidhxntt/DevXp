"use client";
import React, { useEffect, useState } from "react";
import { AppleCardsCarouselDemo } from "@/Components/Carousal";
import {
  //add here
  get_OLTP_data,
  get_OLAP_data,
  get_DataMining_data,
  get_SQL_data,

} from "@/Content/databases";
import GradientCircularProgress from "@/Components/Loader/Loader";


const Databases = () => {
  const [data, setData] = useState({
    //add here
    OLTP: [],
    OLAP: [],
    DataMining: [],
    SQL: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          //add here
          OLTP,
          OLAP,
          DataMining,
          SQL,
        ] = await Promise.all([
          //add here
          get_OLTP_data(),
          get_OLAP_data(),
          get_DataMining_data(),
          get_SQL_data(),
        ]);

        setData({
          //add here
          OLTP,
          OLAP,
          DataMining,
          SQL,
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
      <AppleCardsCarouselDemo
        name="OLAP"
        data={data.OLAP}
      />
      <AppleCardsCarouselDemo
        name="OLAP (Data-Mining)"
        data={data.DataMining}
      />
      <AppleCardsCarouselDemo
        name="SQL"
        data={data.SQL}
      />
    </>
  );
};

export default Databases;
