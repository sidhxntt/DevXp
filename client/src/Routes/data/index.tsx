import { useEffect, useState } from "react";
import { AppleCardsCarouselDemo } from "../../Components/Carousal/index";
import GradientCircularProgress from "../../Components/Loader/Loader";
import { MappedEntry } from "../../Content/ContentfulDataFetching";
import { get_DataMining_data,  } from "../../Content/databases";


interface DataState {
  // add here
  DataMining: MappedEntry[];
}

const Data = () => {
  const [data, setData] = useState<DataState>({
    // add here
    DataMining: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [DataMining,] = await Promise.all([
          // add here
          get_DataMining_data(),
        ]);

        setData({
          // add here
          DataMining: DataMining || [],
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
      <AppleCardsCarouselDemo name="Data Mining" data={data.DataMining} />
    </>
  );
};

export default Data;
