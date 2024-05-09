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

  static async getPlanetWithReviews(planet, currentUser) {
    const serializedPlanet = PlanetSerializer.getPlanetDetails(planet)
    const reviews = await planet.$relatedQuery("reviews")
    serializedPlanet.reviews = await Promise.all(
      reviews.map(async (review) => {
        return await ReviewSerializer.getReviewDetails(review, currentUser)
      }),
    )
    return serializedPlanet
  }
}

export default PlanetSerializer