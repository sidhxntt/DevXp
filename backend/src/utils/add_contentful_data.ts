import { Request, Response, NextFunction } from "express";

  async function add_contentful_data(req: Request, res: Response, next: NextFunction, model: any) {
    try {
        const data = req.body;
    
        if (!Array.isArray(data)) {
          return res.status(400).json({ message: "Invalid data format. Expected an array." });
        }
    
        for (const item of data) {
          const title = item.fields.title;
          const readingTime = item.fields.readingTime;
          const contentType = item.sys.contentType.sys.id;
    
          await model.upsert({
            where: { title },
            update: { contentType },
            create: { title, contentType, readingTime },
          });
        }
        res.status(200).json({ message: "Data processed successfully", data });
      } catch (error) {
        next(error);
      }
    
  }

export default add_contentful_data