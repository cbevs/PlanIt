const Model = require("./Model")

class Review extends Model {
  static get tableName() {
    return "reviews"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["rating"],
      properties: {
        rating: { type: "integer" },
        planetId: { type: ["integer", "string"] },
      },
    }
  }

  static get relationMappings() {
    const { Planet, User } = require("./index.js")
    return {
      planet: {
        relation: Model.BelongsToOneRelation,
        modelClass: Planet,
        join: {
          from: "reviews.planetId",
          to: "planets.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "reviews.userId",
          to: "users.id",
        },
      },
    }
  }
}
module.exports = Review
