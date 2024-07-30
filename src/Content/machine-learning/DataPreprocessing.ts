import createConnection from "../ContentfulClient";

const get_dataPreprocessing_data = async () => {
  try {
    const client = await createConnection();
    const res = await client.getEntries({ content_type: "dataPreprocessing" });

    const dataPreprocessing_data = res.items.map((item) => {
      const fields = item.fields;
      const thumbnail = fields.thumbnail?.fields.file?.url;
      return {
        reading_time: fields.readingTime,
        title: fields.title,
        src: thumbnail ? `https:${thumbnail}` : null, // Handle missing thumbnail
        content: fields.content,
      };
    });
    
    return dataPreprocessing_data;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
  }
};

export default get_dataPreprocessing_data;
