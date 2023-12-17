const mongoose = require('mongoose')
const { parseSchemaFromMongoose } = require('mongoose-schema-parser')

function validate(schema) {
const exportedSchema=parseSchemaFromMongoose(mongoose)
console.log('<===========>')
console.log(exportedSchema)
    return function (req, res, next) {
      try {
        schema.parse({
          body: req.body,
          query: req.query,
          params: req.params,
        });
        next();
      } catch (e) {
        console.log(e)
        return res.status(400).send(e.errors);
      }
    };
  }
  

module.exports= validate;