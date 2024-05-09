// import { Review } from "../models"
import ReviewSerializer from "./ReviewSerializer.js"

class PlanetSerializer {
  static getPlanetDetails(planet) {
    const allowedAttributes = ["id", "name", "description", "imageUrl"]
    let serializedPlanet = {}
    for (const attribute of allowedAttributes) {
      serializedPlanet[attribute] = planet[attribute]
    }
    return serializedPlanet
  }

  static async getPlanetWithReviews(planet) {
    const serializedPlanet = PlanetSerializer.getPlanetDetails(planet)
    const reviews = await planet.$relatedQuery("reviews")
    serializedPlanet.reviews = await Promise.all(
      reviews.map(async (review) => {
        return await ReviewSerializer.getReviewDetails(review)
      }),
    )

    return serializedPlanet
  }
}

export default PlanetSerializer
