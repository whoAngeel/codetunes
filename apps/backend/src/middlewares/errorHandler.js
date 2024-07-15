import { ValidationError } from "sequelize";

export const logErrors = (err, req, res, next) => {
	console.log("ERROR_LOG: ", err.message);
};

export function errorHandler(err, req, res, next) {
	console.log("ERROR_HANDLER: ", err.message);
	res.status(500).json({
		message: err.message,
		stack: err.stack,
	});
}

export function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err
        res.status(output.statusCode).json(output.payload)
    } else {
        next(err)
    }
}

export function ormErrorHandler(err, req, res, next) {
	if (err instanceof ValidationError) {
		res.status(409).json({
			statusCode: 409,
			message: err.name,
			errors: err,
		});
	}
	next(err);
}

