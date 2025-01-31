import { useEffect, useState } from "react";
import { AppleCardsCarouselDemo } from "../../Components/Carousal/index";
import GradientCircularProgress from "../../Components/Loader/Loader";
import { MappedEntry } from "../../Content/ContentfulDataFetching";
import { get_WEB3_data } from "../../Content/future";

interface DataState {
  WEB3: MappedEntry[];
}

const FutureRealm = () => {
  const [data, setData] = useState<DataState>({
    WEB3: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const WEB3 = await get_WEB3_data();

        setData({
          WEB3: WEB3 || [],
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
      <AppleCardsCarouselDemo name="WEB 3" data={data.WEB3} />
    </>
  );
};

export default FutureRealm;
