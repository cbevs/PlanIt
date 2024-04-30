/* eslint-disable no-console */
import { connection } from "../boot.js";
import { Planet } from "../models/index.js"

class Seeder {
  static async seed() {
    
    await Planet.query().insert({name: "Pluto", description: "No longer a planet!"})
    await Planet.query().insert({name: "Jupiter", description: "Very colorful planet."})
    await Planet.query().insert({name: "Saturn", description: "Planet with rings!"})
    
    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
