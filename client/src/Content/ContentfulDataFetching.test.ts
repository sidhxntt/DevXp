import { beforeEach, describe, expect, it, vi } from "vitest";
import createConnection from "./ContentfulClient";
import { searchContentfulData } from "./ContentfulDataFetching";
import { BLOCKS, type Document } from "@contentful/rich-text-types";

vi.mock("./ContentfulClient", () => ({ default: vi.fn() }));

describe("searchContentfulData", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns mapped entries for a trimmed search term", async () => {
    const document: Document = {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [],
    };
    const getEntries = vi.fn().mockResolvedValue({
      items: [
        {
          fields: {
            readingTime: "5 min",
            title: "AWS Basics",
            thumbnail: { fields: { file: { url: "//image.example/aws.png" } } },
            content: document,
          },
        },
      ],
    });
    vi.mocked(createConnection).mockResolvedValue({ getEntries } as never);

    await expect(searchContentfulData("  aws  ")).resolves.toEqual([
      {
        reading_time: "5 min",
        title: "AWS Basics",
        src: "https://image.example/aws.png",
        content: document,
      },
    ]);
    expect(getEntries).toHaveBeenCalledWith({ query: "aws", limit: 20 });
  });

  it("returns no entries without connecting for a blank search term", async () => {
    await expect(searchContentfulData(" \t ")).resolves.toEqual([]);
    expect(createConnection).not.toHaveBeenCalled();
  });
});
