import { Request } from "express";

export interface UserInput {
    email: string;
  }
  
export interface AuthenticatedRequest extends Request {
    auth?: {
      userId: string;
      sessionId: string;
      actor: string | null;
    };
  }
  