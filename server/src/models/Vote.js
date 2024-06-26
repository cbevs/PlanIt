const Model = require("./Model")

class Vote extends Model {

  static get tableName() {
    return "votes"
  }
  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        userId: { type: "integer" },
        reviewId: { type: "integer" },
        voteValue: { type: "integer" },
      },
    }
  }
  
  static get relationMappings(){
    const { Review, User } = require("./index.js")
    return{
      review: {
        relation: Model.BelongsToOneRelation,
        modelClass: Review,
        join:{
          from: "votes.reviewId",
          to: "reviews.id"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "votes.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Vote
