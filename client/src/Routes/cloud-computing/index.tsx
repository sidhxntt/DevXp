import { useEffect, useState } from "react";
import { AppleCardsCarouselDemo } from "../../Components/Carousal/index";
import GradientCircularProgress from "../../Components/Loader/Loader";
import { MappedEntry } from "../../Content/ContentfulDataFetching";
import { get_cloudcomputing_data, get_AWS_data } from "../../Content/CloudComputing";


interface DataState {
  // add here
  cloud_computing: MappedEntry[];
  AWS: MappedEntry[];
}

const CloudComputing = () => {
  const [data, setData] = useState<DataState>({
    // add here
    cloud_computing: [],
    AWS: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cloud_computing, AWS] = await Promise.all([
          // add here
          get_cloudcomputing_data(),
          get_AWS_data(),
        ]);

        setData({
          // add here
          cloud_computing: cloud_computing || [],
          AWS: AWS || [],
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
      <AppleCardsCarouselDemo name="Cloud Computing" data={data.cloud_computing} />
      <AppleCardsCarouselDemo name="AWS" data={data.AWS} />
    </>
  );
};

export default CloudComputing;
