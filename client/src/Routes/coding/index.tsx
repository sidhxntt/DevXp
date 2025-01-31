import { useEffect, useState } from "react";
import { AppleCardsCarouselDemo } from "../../Components/Carousal/index";
import GradientCircularProgress from "../../Components/Loader/Loader";
import { MappedEntry } from "../../Content/ContentfulDataFetching";
import { get_CodingEssentials_data } from "../../Content/coding";


interface DataState {
  // add here
  Coding: MappedEntry[];
}

const Coding = () => {
  const [data, setData] = useState<DataState>({
    // add here
    Coding: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [Coding] = await Promise.all([
          // add here
          get_CodingEssentials_data(),
        ]);

        setData({
          // add here
          Coding: Coding || [],
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
      <AppleCardsCarouselDemo name="Concepts & Strategies" data={data.Coding} />
    </>
  );
};

export default Coding;
