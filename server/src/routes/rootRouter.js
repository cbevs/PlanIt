import express from "express";

import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import planetsRouter from "./api/v1/planetsRouter.js";
import votesRouter from "./api/v1/votesRouter.js"

const rootRouter = new express.Router();

rootRouter.get("/", (req, res) => {
  res.redirect("/planets")
})

rootRouter.use("/api/v1/votes", votesRouter)
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/planets", planetsRouter)
rootRouter.use("/", clientRouter)
// place your server-side routes here

export default rootRouter;
