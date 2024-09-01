import { useEffect, useState } from "react";
import { AppleCardsCarouselDemo } from "../../Components/Carousal/index";
import { get_FrontendEssentials_data } from "../../Content/frontend/index";
import GradientCircularProgress from "../../Components/Loader/Loader";
import { MappedEntry } from "../../Content/ContentfulDataFetching";

interface DataState {
  Frontend_Essentials: MappedEntry[];
}

const Frontend = () => {
  const [data, setData] = useState<DataState>({
    Frontend_Essentials: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Frontend_Essentials = await get_FrontendEssentials_data();

        setData({
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
    <>
      <AppleCardsCarouselDemo name="Frontend Essentials" data={data.Frontend_Essentials} />
    </>
  );
};

export default Frontend;
