// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { BLOCKS } from "@contentful/rich-text-types";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { searchContentfulData } from "../../Content/ContentfulDataFetching";
import Search from ".";

vi.mock("../../Content/ContentfulDataFetching", () => ({
  searchContentfulData: vi.fn(),
}));

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(cleanup);

it('shows the matching-post count after a successful search', async () => {
  vi.mocked(searchContentfulData).mockResolvedValue([
    {
      reading_time: "5 min",
      title: "AWS Basics",
      src: "https://image.example/aws.png",
      content: { nodeType: BLOCKS.DOCUMENT, data: {}, content: [] },
    },
  ]);

  render(
    <MemoryRouter initialEntries={["/search?q=aws"]}>
      <Search />
    </MemoryRouter>
  );

  expect(await screen.findByText('1 result for "aws"')).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /AWS Basics/i })).toBeInTheDocument();
});

it("prompts for a topic without requesting a blank search", () => {
  render(
    <MemoryRouter initialEntries={["/search?q=%20%20"]}>
      <Search />
    </MemoryRouter>
  );

  expect(screen.getByText("Enter a topic to search DevXP.")).toHaveClass("text-neutral-200");
  expect(searchContentfulData).not.toHaveBeenCalled();
});

it("shows loading feedback while matching posts are requested", () => {
  vi.mocked(searchContentfulData).mockReturnValue(new Promise(() => {}));
  render(
    <MemoryRouter initialEntries={["/search?q=aws"]}>
      <Search />
    </MemoryRouter>
  );

  expect(screen.getByText("Searching for \"aws\"…")).toHaveClass("text-neutral-200");
});

it("shows a no-results message when the search finds no posts", async () => {
  vi.mocked(searchContentfulData).mockResolvedValue([]);
  render(
    <MemoryRouter initialEntries={["/search?q=aws"]}>
      <Search />
    </MemoryRouter>
  );

  expect(await screen.findByText('No results for "aws".')).toHaveClass("text-neutral-200");
});

it("shows an error when the search fails", async () => {
  vi.mocked(searchContentfulData).mockRejectedValue(new Error("Network error"));
  render(
    <MemoryRouter initialEntries={["/search?q=aws"]}>
      <Search />
    </MemoryRouter>
  );

  expect(await screen.findByText("Search failed. Please try again.")).toHaveClass("text-neutral-200");
});
