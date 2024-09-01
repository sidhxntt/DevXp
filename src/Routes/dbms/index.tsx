import { useEffect, useState } from "react";
import { AppleCardsCarouselDemo } from "../../Components/Carousal/index";
import GradientCircularProgress from "../../Components/Loader/Loader";
import { MappedEntry } from "../../Content/ContentfulDataFetching";
import { get_OLTP_data, get_OLAP_data, get_DataMining_data, get_SQL_data } from "../../Content/databases";


interface DataState {
  // add here
  OLTP: MappedEntry[];
  OLAP: MappedEntry[];
  DataMining: MappedEntry[];
  SQL: MappedEntry[];
}

const Databases = () => {
  const [data, setData] = useState<DataState>({
    // add here
    OLTP: [],
    OLAP: [],
    DataMining: [],
    SQL: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [OLTP, OLAP, DataMining, SQL] = await Promise.all([
          // add here
          get_OLTP_data(),
          get_OLAP_data(),
          get_DataMining_data(),
          get_SQL_data(),
        ]);

        setData({
          // add here
          OLTP: OLTP || [],
          OLAP: OLAP || [],
          DataMining: DataMining || [],
          SQL: SQL || [],
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
    // add here
    <>
      <AppleCardsCarouselDemo name="OLTP" data={data.OLTP} />
      <AppleCardsCarouselDemo name="OLAP" data={data.OLAP} />
      <AppleCardsCarouselDemo name="Data Mining" data={data.DataMining} />
      <AppleCardsCarouselDemo name="SQL" data={data.SQL} />
    </>
  );
};

export default Databases;
