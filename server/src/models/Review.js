const Model = require("./Model")

class Review extends Model {

  static get tableName() {
    return "reviews"
  }

  async $voteCount() {
    
    let upVotes = 0
    let downVotes = 0

    const votes = await this.$relatedQuery("votes")

    votes.forEach((vote) => {
      if (vote.voteValue === 1) {
        upVotes++
      } 
      if (vote.voteValue === -1){
        downVotes++
      }
    })
    
    return { upVotes, downVotes}
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
    const { Planet, User, Vote } = require("./index.js")
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
      votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
          from: "reviews.id",
          to: "votes.reviewId",
        },
      },
    }
  }
}
module.exports = Review
