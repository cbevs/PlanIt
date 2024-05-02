const Model = require("./Model")

class Review extends Model {
  static get tableName() {
    return "reviews"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["reviewText"],
      properties: {
        reviewText: { type: "string", minLength: 1 },
        planetId: {type: ["integer", "string"]}
      }
    }
  }

  static get relationMappings() {
    const { Planet } = require("./index.js")
    return {
      planet: {
        relation: Model.BelongsToOneRelation,
        modelClass: Planet,
        join: {
          from: "reviews.planetId",
          to: "planets.id"
        }
      }
    }
  }
}
module.exports = Review