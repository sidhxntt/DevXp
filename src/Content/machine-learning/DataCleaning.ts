import { createClient } from "contentful";

// Fetch data from Contentful
const getdata = async () => {
  try {
    const client = createClient({
      space: "pck04d18e2o1",
      accessToken: "2AHigTyYL2481suTvHgSVl_xrd5pNwaac-dxyyxzEa8",
    });
    const res = await client.getEntries({ content_type: "machineLearning" });

    // Check if items exist
    if (!res.items) {
      console.error("No items found");
      return [];
    }
    
    // Transform data
    const Data = res.items.map(item => ({
      category: item.fields.category,
      title: item.fields.title,
      src: `https:${item.fields.thumbnail.fields.file.url}`,
      content: item.fields.content,
    }));
    
    return Data;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    return [];
  }
};

export default getdata;
