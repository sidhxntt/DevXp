import axios from "axios";
import createConnection from "./ContentfulClient";
import { Document } from "@contentful/rich-text-types";

interface MappedEntry {
  reading_time: string;
  title: string;
  src: string;
  content: Document;
}

const mapEntries = (items: any[]): MappedEntry[] => {
  return items.map((item) => {
    const fields = item.fields;
    const thumbnail = fields.thumbnail?.fields.file?.url;
    return {
      reading_time: fields.readingTime || "0",
      title: fields.title || "",
      src: thumbnail ? `https:${thumbnail}` : "",
      content: fields.content || "",
    };
  });
};


const fetchContentfulData = async (
  contentType: string
): Promise<MappedEntry[] | undefined> => {
  try {
    const client = await createConnection();

    if (!client) {
      throw new Error("Contentful client is undefined");
    }
    const res: any = await client.getEntries({ content_type: contentType });
    const data = res.items;
    await axios
      .post(
        `${import.meta.env.VITE_API_ENDPOINT}/add_data`, 
        data, 
        { 
          headers: {
            "Content-Type": "application/json",
          }
        }
      )
      .then(function (response) {
        console.log("Data sent to the server:", response.data); 
      })
      .catch(function (error) {
        console.error("Error sending data to the server:", error); 
      });
    return mapEntries(data);
  } catch (error) {
    console.error(`Error fetching ${contentType} data from Contentful:`, error);
  }
};

const fetchSelectedContentfulData = async (token:string|null): Promise<MappedEntry[] | undefined> => {
  try {
    const client = await createConnection();
    if (!client) {
      throw new Error("Contentful client is undefined");
    }

    // Fetch the selected blogs (user's favorite blogs) from the backend
    const backendResponse = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/fav/get_favblog`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const selectedBlogs = backendResponse.data["User Fav Blogs"]; // Extract favorite blogs array
    if (!Array.isArray(selectedBlogs)) {
      throw new Error("Invalid response from backend. Expected an array.");
    }

    // Extract blog titles and content types from the backend response
    const selectedBlogCriteria = selectedBlogs.map((favBlog: any) => ({
      title: favBlog.Blog.title,
      contentType: favBlog.Blog.contentType,
    }));

    // Group the selected blogs by contentType
    const groupedByContentType = selectedBlogCriteria.reduce((acc, blog) => {
      if (!acc[blog.contentType]) {
        acc[blog.contentType] = [];
      }
      acc[blog.contentType].push(blog.title);
      return acc;
    }, {} as Record<string, string[]>);

    // Fetch and filter blogs for each contentType
    const filteredEntries: any[] = [];
    for (const [contentType, titles] of Object.entries(groupedByContentType)) {
      const res: any = await client.getEntries({ content_type: contentType });
      const data = res.items;

      // Filter blogs based on titles
      const filteredData = data.filter((item: any) => {
        const blogTitle = item.fields.title;
        return titles.includes(blogTitle);
      });

      filteredEntries.push(...filteredData);
    }

    // Map and return the filtered entries
    return mapEntries(filteredEntries);
  } catch (error) {
    console.error("Error fetching filtered data from Contentful:", error);
  }
};

export {fetchContentfulData, fetchSelectedContentfulData};
export type { MappedEntry };
