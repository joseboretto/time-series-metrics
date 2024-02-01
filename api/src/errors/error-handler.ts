import {NextFunction, Request, Response} from "express";
import {CustomError, CustomErrorContent} from "./custom.error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Handled errors
    if (err instanceof CustomError) {
        const {statusCode, error, logging} = err;
        if (logging) {
            console.error(JSON.stringify({
                code: err.statusCode,
                error: err.error,
                stack: err.stack,
            }, null, 2));
        }

        return res.status(statusCode).send({error});
    }

    // Unhandled errors
    console.error(err);
    const error: CustomErrorContent = {
        message: err.message,
    }
    return res.status(500).send({error});
};