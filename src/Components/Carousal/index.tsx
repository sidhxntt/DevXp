import { Carousel, Card } from "./Carousal";
import { MappedEntry } from "../../Content/ContentfulDataFetching";
import { Document } from "@contentful/rich-text-types";

interface AppleCardsCarouselDemoProps {
  name: string;
  data: MappedEntry[];
}

// Define the Card type based on the error message
interface CardType {
  reading_time: string;
  title: string;
  src: string;
  content: Document;
}

// Convert MappedEntry to CardType
const mapEntryToCard = (entry: MappedEntry): CardType | null => {
  if (entry.src === null) return null;
  return {
    reading_time: entry.reading_time.toString(), // Convert number to string
    title: entry.title,
    src: entry.src,
    content: entry.content
  };
};

export function AppleCardsCarouselDemo({ name, data }: AppleCardsCarouselDemoProps): JSX.Element {
  const cards = data
    .map(mapEntryToCard)
    .filter((card): card is CardType => card !== null)
    .map((card, index) => (
      <Card key={card.src} card={card} index={index} />
    ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-200 font-sans">
        {name}
      </h2>
      <Carousel items={cards} />
    </div>
  );
}