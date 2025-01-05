import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { tokenAquired } from "../../lib/atoms";

interface Card {
  title: string;
}

interface FavButtonProps {
  card: Card;
}

const FavButton: React.FC<FavButtonProps> = ({ card }) => {
  const [fav, setFav] = useState<boolean>(false); // Tracks if the blog is favorited
  const [Token] = useRecoilState(tokenAquired); // Read token from Recoil state

  const handleClick = async () => {

    const data = { title: card.title };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/fav/set_favblog`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      if (response.data.message === "Blog favorited") {
        setFav(true);
      } else if (response.data.message === "Blog unfavored") {
        setFav(false);
      }
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  };

  useEffect(() => {
    const checkFavStatus = async () => {

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/fav/fav_status`,
          { title: card.title },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Token}`,
            },
          }
        );

        if (response.data.title === card.title && response.data.favored) {
          setFav(true);
        } else {
          setFav(false);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkFavStatus();
  }, [card.title, Token]); // Only run when card.title or token changes

  return (
    <button onClick={handleClick} className="fav-button">
      {Token ? (
        fav ? <FaStar color="yellow" /> : <FaRegStar color="white" />
      ) : null}
    </button>
  );
};

export default FavButton;
