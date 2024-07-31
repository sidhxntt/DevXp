import createConnection from "./ContentfulClient";

const mapEntries = (items:any) => {
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

const fetchContentfulData = async (contentType:string) => {
  try {
    const client = await createConnection();
    const res = await client.getEntries({ content_type: contentType });
    return mapEntries(res.items);
  } catch (error) {
    console.error(`Error fetching ${contentType} data from Contentful:`, error);
  }
};

export default fetchContentfulData;
