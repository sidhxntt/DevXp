import { createClient } from "contentful";

const createConnection = async () => {
  try {
    const client = createClient({
      space: "pck04d18e2o1",
      accessToken: "2AHigTyYL2481suTvHgSVl_xrd5pNwaac-dxyyxzEa8",
    });
    return client;
  } catch (error) {
    console.error("Error connecting to Contentful:", error);
  }
};

export default createConnection;
