import { useEffect, useState } from "react";
import { AppleCardsCarouselDemo } from "../../Components/Carousal/index";
import GradientCircularProgress from "../../Components/Loader/Loader";
import { MappedEntry, fetchSelectedContentfulData } from "../../Content/ContentfulDataFetching";
import { useAuth } from "@clerk/clerk-react";

interface DataState {
  Your_Favourites: MappedEntry[];
}

const UserFav =  () => {
  const [data, setData] = useState<DataState>({
    Your_Favourites: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const template = "DevXPUserInfo";
        const token = await getToken({ template });
        if (token) {
          setToken(token);
        }
      } catch (error) {
        setError("Failed to fetch token");
        console.error("Failed to fetch token:", error);
      }
    };

    fetchToken();
  }, [getToken]);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return; // Don't fetch data if no token is available

      try {
        const Your_Favourites = await fetchSelectedContentfulData(token);

        setData({
          Your_Favourites: Your_Favourites || [],
        });
      } catch (err) {
        setError("Failed to load data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

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
      <AppleCardsCarouselDemo name="Your Favourites" data={data.Your_Favourites} />
    </>
  );
};

export default UserFav;
