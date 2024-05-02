/* eslint-disable no-console */
import { connection } from "../boot.js";
import { Planet, Review } from "../models/index.js"

class Seeder {
  static async seed() {
    
    await Planet.query().insert({name: "Pluto", description: "No longer a planet!"})
    await Planet.query().insert({name: "Jupiter", description: "Very colorful planet."})
    await Planet.query().insert({name: "Saturn", description: "Planet with rings!"})

    const pluto = await Planet.query().findOne("name", "Pluto")
    await pluto.$relatedQuery("reviews").insert({body: "Super cold, I'm not going there again.."})

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
