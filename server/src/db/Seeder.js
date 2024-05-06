/* eslint-disable no-console */
import { connection } from "../boot.js";
import { Planet, Review, User } from "../models/index.js"

class Seeder {
  static async seed() {
    
    await User.query().insert({email: "chris@chris.com", cryptedPassword: "111" })
    await User.query().insert({email: "dan@dan.com", cryptedPassword: "111" })
    await User.query().insert({email: "luke@luke.com", cryptedPassword: "111" })

    await Planet.query().insert({name: "Pluto", description: "No longer a planet!"})
    await Planet.query().insert({name: "Jupiter", description: "Very colorful planet."})
    await Planet.query().insert({name: "Saturn", description: "Planet with rings!"})

    const pluto = await Planet.query().findOne({name: "Pluto"})
    await pluto.$relatedQuery("reviews").insert({body: "Super cold, I'm not going there again..", rating: 3, userId: 1})
    await pluto.$relatedQuery("reviews").insert({body: "Too cold, brrrrr", rating: 1, userId: 2})

    const saturn = await Planet.query().findOne({name: "Saturn"})
    await saturn.$relatedQuery("reviews").insert({body: "Holy geez the rings!", rating: 5, userId: 1})
    await saturn.$relatedQuery("reviews").insert({body: "Rings bigger than the one my hubby got me :/", rating: 5, userId: 3})

    const jupiter = await Planet.query().findOne({name: "Jupiter"})
    await jupiter.$relatedQuery("reviews").insert({body: "Feels like home, oddly?", rating: 4, userId: 1})
    await jupiter.$relatedQuery("reviews").insert({body: "Ouch the gravity", rating: 2, userId: 2})

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
