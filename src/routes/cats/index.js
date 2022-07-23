const { Router } = require("express");
const CatsController = require("../../controllers/cats.controller");
const HttpException = require("../../shared/http-exceptions/http.exception");
const ValidationException = require("../../shared/http-exceptions/validation.exception");
const {
  CatValidationSchema,
  CatUpdateValidationSchema,
} = require("../../shared/validation-schemas");

const cats = Router();

cats.post(
  "/",
  ValidationException.validate({ body: CatValidationSchema }),
  CatsController.createCat
);
cats.get("/", CatsController.getAllCats);
cats.get("/:id", HttpException.wrapHandler(CatsController.getSingleCat));
cats.put(
  "/:id",
  ValidationException.validate({ body: CatUpdateValidationSchema }),
  HttpException.wrapHandler(CatsController.updateCat)
);
cats.delete("/:id", HttpException.wrapHandler(CatsController.deleteCat));

module.exports = cats;
