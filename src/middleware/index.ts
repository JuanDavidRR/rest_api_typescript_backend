import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const handleInputErrors = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.status(400).json({ errors: errors.array() });
      return;
    }
  }
  next();
};
