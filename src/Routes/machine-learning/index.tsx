import { useEffect, useState } from "react";
import { AppleCardsCarouselDemo } from "../../Components/Carousal/index";
import GradientCircularProgress from "../../Components/Loader/Loader";
import { MappedEntry } from "../../Content/ContentfulDataFetching";
import { get_dataPreprocessing_data, get_Supervised_algorithms_data, get_Unsupervised_algorithms_data, get_Regularization_technqiues_data } from "../../Content/machine-learning";


interface DataState {
  // add here
  dataPreprocessing: MappedEntry[];
  supervisedAlgorithms: MappedEntry[];
  unsupervisedAlgorithms: MappedEntry[];
  regularizationTechnqiues: MappedEntry[];
}

const MachineLearning = () => {
  const [data, setData] = useState<DataState>({
    // add here
    dataPreprocessing: [],
    supervisedAlgorithms: [],
    unsupervisedAlgorithms: [],
    regularizationTechnqiues: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          // add here
          dataPreprocessing,
          supervisedAlgorithms,
          unsupervisedAlgorithms,
          regularizationTechnqiues,
        ] = await Promise.all([
          // add here
          get_dataPreprocessing_data(),
          get_Supervised_algorithms_data(),
          get_Unsupervised_algorithms_data(),
          get_Regularization_technqiues_data(),
        ]);

        setData({
          // add here
          dataPreprocessing: dataPreprocessing || [],
          supervisedAlgorithms: supervisedAlgorithms || [],
          unsupervisedAlgorithms: unsupervisedAlgorithms || [],
          regularizationTechnqiues: regularizationTechnqiues || [],
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
      <AppleCardsCarouselDemo name="Data Preprocessing" data={data.dataPreprocessing}/>
      <AppleCardsCarouselDemo name="Supervised Algorithms" data={data.supervisedAlgorithms}/>
      <AppleCardsCarouselDemo name="Unsupervised Algorithms" data={data.unsupervisedAlgorithms}/>
      <AppleCardsCarouselDemo name="Regularization Techniques" data={data.regularizationTechnqiues}/>
    </>
  );
};

export default MachineLearning;
