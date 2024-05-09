import express from "express"
import { ValidationError } from "objection"
import { User } from "../../../models/index.js"
import uploadImage from "../../../services/uploadImage.js"

const usersRouter = new express.Router()

usersRouter.post("/", uploadImage.single("image"), async (req, res) => {
  try {
    const { body } = req
    let data
    if (!req.file) {
      data = {
        ...body,
        image: null,
      }
    } else {
      data = {
        ...body,
        image: req.file.location,
      }
    }
    const persistedUser = await User.query().insertAndFetch(data)
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser })
    })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error.message })
  }
})

export default usersRouter
