import createConnection from "./ContentfulClient";

// Define interfaces for Contentful data
interface ContentfulFields {
  readingTime: number;
  title: string;
  thumbnail?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  content: string;
}

interface ContentfulItem {
  fields: ContentfulFields;
}

interface ContentfulResponse {
  items: ContentfulItem[];
}

// Define the type for the mapped entry
interface MappedEntry {
  reading_time: number;
  title: string;
  src: string | null;
  content: string;
}

// Map Contentful entries to the desired format
const mapEntries = (items: ContentfulItem[]): MappedEntry[] => {
  return items.map((item) => {
    const fields = item.fields;
    const thumbnail = fields.thumbnail?.fields.file?.url;
    return {
      reading_time: fields.readingTime,
      title: fields.title,
      src: thumbnail ? `https:${thumbnail}` : null, // Handle missing thumbnail
      content: fields.content,
    };
  });
};

// Fetch data from Contentful and return mapped entries
const fetchContentfulData = async (contentType: string): Promise<MappedEntry[] | undefined> => {
  try {
    const client = await createConnection();
    
    // Ensure client is defined before using
    if (!client) {
      throw new Error("Contentful client is undefined");
    }
    
    const res: ContentfulResponse = await client.getEntries({ content_type: contentType });
    
    // Handle response and map entries
    return mapEntries(res.items);
  } catch (error) {
    console.error(`Error fetching ${contentType} data from Contentful:`, error);
  }
};

export default fetchContentfulData;