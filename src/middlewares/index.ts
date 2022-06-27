import { customErrorHandler } from "./customErrorHandler.middleware";
import { verifyEmailAndDocument } from "./verifyEmailAndDocument.middleware";
import { validateSchema } from "./validateSchema.middleware";
import { verifyIdExists } from "./verifyIdExists.middleware";

export {
  customErrorHandler,
  verifyEmailAndDocument,
  validateSchema,
  verifyIdExists,
};
