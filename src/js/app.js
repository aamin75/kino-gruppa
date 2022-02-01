import express from "express";
import { engine } from "express-handlebars";
import { marked } from "marked";
import moviesRouter from "./routes/movies.js";
import reviewPageFilter from "./modules/reviews/movieReviewFilter.js"
import apiRouter from "./routes/api.js"

const app = express();

app.engine(
  "handlebars",
  engine({
    helpers: {
      markdown: (md) => marked(md),
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/api/movies/:movieId/reviews", reviewPageFilter)

app.use("/movies", moviesRouter);

// API Router.
app.use(express.json());
app.use("/api", apiRouter);
//

app.use("/public", express.static("./public"));

app.get("/*", (req, res) => {
  res.status(404).render("404");
});

export default app;
