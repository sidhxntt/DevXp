import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppleCardsCarouselDemo } from "../../Components/Carousal";
import {
  searchContentfulData,
  type MappedEntry,
} from "../../Content/ContentfulDataFetching";

type SearchState = {
  query: string;
  status: "loading" | "success" | "error";
  results: MappedEntry[];
};

const feedbackClassName = "mx-auto max-w-7xl px-4 pt-10 text-neutral-200";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const [state, setState] = useState<SearchState>({
    query: "",
    status: "loading",
    results: [],
  });

  useEffect(() => {
    if (!query) return;

    let active = true;
    setState({ query, status: "loading", results: [] });
    searchContentfulData(query)
      .then((results) => {
        if (active) setState({ query, status: "success", results });
      })
      .catch(() => {
        if (active) setState({ query, status: "error", results: [] });
      });

    return () => {
      active = false;
    };
  }, [query]);

  if (!query) return <p className={feedbackClassName}>Enter a topic to search DevXP.</p>;
  if (state.query !== query || state.status === "loading") {
    return <p role="status" className={feedbackClassName}>Searching for "{query}"…</p>;
  }
  if (state.status === "error") {
    return <p role="alert" className={feedbackClassName}>Search failed. Please try again.</p>;
  }
  if (state.results.length === 0) {
    return <p className={feedbackClassName}>No results for "{query}".</p>;
  }

  return (
    <section aria-label="Search results">
      <h1 className="max-w-7xl px-4 mx-auto pt-10 text-xl md:text-3xl font-bold text-neutral-200">
        {state.results.length} {state.results.length === 1 ? "result" : "results"} for "{query}"
      </h1>
      <AppleCardsCarouselDemo name="Matching posts" data={state.results} />
    </section>
  );
};

export default Search;
