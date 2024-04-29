const Model = require("./Model")
const uniqueFactory = require("objection-unique")

const unique = uniqueFactory({
    fields: ["name"],
    identifiers: ["id"]
})

class Planet extends unique(Model){

    static get tableName(){
        return "planets"
    }

    static get jsonSchema(){
        return{
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string", minLength: 1 },
                description: { type: "string" }
            }
        }
    }
} 

module.exports = Planet