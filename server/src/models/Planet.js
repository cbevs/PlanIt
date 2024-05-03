const Model = require("./Model")
const uniqueFactory = require("objection-unique")

const unique = uniqueFactory({
    fields: ["name"],
    identifiers: ["id"]
})

class Planet extends unique(Model) {

    static get tableName() {
        return "planets"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string", minLength: 1 },
                description: { type: "string" }
            }
        }
    }

    static get relationMappings() {
      const { Review } = require("./index.js")
      return {
        reviews: {
          relation: Model.HasManyRelation,
          modelClass: Review,
          join: {
            from: "planets.id",
            to: "reviews.planetId"
          }
        }
      }
    }
}

module.exports = Planet