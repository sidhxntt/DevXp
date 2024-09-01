import createConnection from "./ContentfulClient";

// Define the type for the mapped entry
interface MappedEntry {
  reading_time: number;
  title: string;
  src: string | null;  // Allow null for src
  content: string;
}

// Map Contentful entries to the desired format
const mapEntries = (items: any[]): MappedEntry[] => {
  return items.map((item) => {
    const fields = item.fields;
    const thumbnail = fields.thumbnail?.fields.file?.url;
    return {
      reading_time: fields.readingTime || 0,  // Provide a default value
      title: fields.title || "",  // Provide a default value
      src: thumbnail ? `https:${thumbnail}` : null,
      content: fields.content || "",  // Provide a default value
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
    
    const res: any = await client.getEntries({ content_type: contentType });
    
    // Handle response and map entries
    return mapEntries(res.items);
  } catch (error) {
    console.error(`Error fetching ${contentType} data from Contentful:`, error);
  }
};

export default fetchContentfulData;
export type { MappedEntry };