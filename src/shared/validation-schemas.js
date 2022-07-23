const Joi = require("joi");

const format = {
  name: Joi.string(),
  age: Joi.number(),
  breed: Joi.string(),
};

exports.CatValidationSchema = Joi.object({
  name: format.name.required(),
  age: format.age.required(),
  breed: format.breed.required(),
});

exports.CatUpdateValidationSchema = Joi.object({
  name: format.name,
  age: format.age,
  breed: format.breed,
});
