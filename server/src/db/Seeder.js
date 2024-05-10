/* eslint-disable no-console */
import { connection } from "../boot.js";
import { Planet, Review, User, Vote } from "../models/index.js"

class Seeder {
  static async seed() {
    
    await User.query().insert({email: "chris@chris.com", cryptedPassword: "111" })
    await User.query().insert({email: "dan@dan.com", cryptedPassword: "111" })
    await User.query().insert({email: "luke@luke.com", cryptedPassword: "111" })

    await Planet.query().insert({name: "Pluto", description: "No longer a planet!", imageUrl: "https://plan-it-production.s3.us-east-2.amazonaws.com/pluto+(1).png"})
    await Planet.query().insert({name: "Jupiter", description: "Very colorful planet.", imageUrl: "https://plan-it-production.s3.us-east-2.amazonaws.com/jupiter+(1).png"})
    await Planet.query().insert({name: "Saturn", description: "Planet with rings!", imageUrl: "https://plan-it-production.s3.us-east-2.amazonaws.com/saturn+(1).png"})


    const pluto = await Planet.query().findOne({name: "Pluto"})
    await pluto.$relatedQuery("reviews").insertAndFetch({body: "Super cold, I'm not going there again..", rating: 3, userId: 1})
    await pluto.$relatedQuery("reviews").insert({body: "Too cold, brrrrr", rating: 1, userId: 2})

    const saturn = await Planet.query().findOne({name: "Saturn"})
    await saturn.$relatedQuery("reviews").insert({body: "Holy geez the rings!", rating: 5, userId: 1})
    await saturn.$relatedQuery("reviews").insert({body: "Rings bigger than the one my hubby got me :/", rating: 5, userId: 2})

    const jupiter = await Planet.query().findOne({name: "Jupiter"})
    await jupiter.$relatedQuery("reviews").insert({body: "Feels like home, oddly?", rating: 4, userId: 1})
    await jupiter.$relatedQuery("reviews").insert({body: "Ouch the gravity", rating: 2, userId: 2})

    const firstPlutoReview = await Review.query().findOne({id: 1})
    const secondPlutoReview = await Review.query().findOne({id: 2})
    const firstSaturnReview = await Review.query().findOne({id: 3})
    const secondSaturnReview = await Review.query().findOne({id: 4})
    const firstJupiterReview = await Review.query().findOne({id: 5})
    const secondJupiterReview = await Review.query().findOne({id: 6})

    await firstPlutoReview.$relatedQuery("votes").insert({userId: 1, reviewId: 1, voteValue: 1})
    await secondPlutoReview.$relatedQuery("votes").insert({userId: 2, reviewId: 2, voteValue: 1})
    await firstSaturnReview.$relatedQuery("votes").insert({userId: 1, reviewId: 3, voteValue: -1})
    await firstSaturnReview.$relatedQuery("votes").insert({userId: 2, reviewId: 3, voteValue: -1})
    await secondSaturnReview.$relatedQuery("votes").insert({userId: 2, reviewId: 4, voteValue: -1})
    await firstJupiterReview.$relatedQuery("votes").insert({userId: 1, reviewId: 5, voteValue: 1})
    await secondJupiterReview.$relatedQuery("votes").insert({userId: 2, reviewId: 6, voteValue: 1})

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
