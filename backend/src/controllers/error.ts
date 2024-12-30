import { Request, Response, NextFunction } from "express";

const error_handling = (err: Error, req: Request , res: Response, next: NextFunction) : void => {
    console.error('Error:', err.stack); 
    res.status(500).json({
      message: 'Internal Server Error',
      error: err.message
    });
  };
  
export default error_handling;
  