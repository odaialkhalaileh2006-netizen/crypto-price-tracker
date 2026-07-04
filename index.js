import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

const API_URL = "https://api.coingecko.com/api/v3/coins/";
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.render("index.ejs",{data: null, error: null});
})
app.post("/coin", async (req, res) => {
  const coin = req.body.coin?.toLowerCase();

  if (!coin) {
    return res.render("index.ejs", {
      data: null,
      error: "Please enter a coin name"
    });
  }

  try {
     const result = await axios.get(`${API_URL}${coin}`);

     return res.render("index.ejs", {
      data: result.data,
      error: null
    });

  } catch (error) {
    return res.render("index.ejs", {
      data: null,
      error: "Coin not found. Try bitcoin, ethereum, solana."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})