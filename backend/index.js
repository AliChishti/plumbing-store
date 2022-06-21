const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const feedbackRoutes = require("./routes/feedback");
const cardRoutes = require("./routes/card");
const cartRoutes = require("./routes/cart");


require("dotenv").config();

app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

const corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/card", cardRoutes);
app.use("/cart", cartRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Welcome to plumbing store" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
