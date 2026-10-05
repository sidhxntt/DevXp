// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, expect, it } from "vitest";
import Navbar from "./Navbar";

afterEach(cleanup);

const LocationDisplay = () => {
  const location = useLocation();
  return <output data-testid="location">{location.pathname + location.search}</output>;
};

it("navigates to a shareable search URL with a trimmed, encoded term", async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <Navbar />
      <LocationDisplay />
    </MemoryRouter>
  );

  await user.type(screen.getByRole("searchbox", { name: "Search DevXP blogs" }), "  AWS & cloud  ");
  await user.click(screen.getByRole("button", { name: "Search" }));

  expect(screen.getByTestId("location")).toHaveTextContent(/^\/search\?q=AWS%20%26%20cloud$/);
});

it("does not navigate when the search term is blank", async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <Navbar />
      <LocationDisplay />
    </MemoryRouter>
  );

  await user.type(screen.getByRole("searchbox", { name: "Search DevXP blogs" }), "   ");
  await user.click(screen.getByRole("button", { name: "Search" }));

  expect(screen.getByTestId("location")).toHaveTextContent(/^\/$/);
});

it("opens the coffee link in a new tab", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  const coffeeLink = screen.getByRole("link", { name: "Visit sidhxntt.dev" });
  expect(coffeeLink).toHaveAttribute("href", "https://sidhxntt.dev/");
  expect(coffeeLink).toHaveAttribute("target", "_blank");
  expect(coffeeLink).toHaveAttribute("rel", "noopener noreferrer");
});
