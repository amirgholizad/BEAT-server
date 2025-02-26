import axios from "axios";

const getHistory = async (req, res) => {
  const product_id = `${req.query.product_id}`;
  const granularity = `${req.query.granularity}`;
  const start = `${req.query.start}`;
  const end = `${req.query.end}`;
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.exchange.coinbase.com/products/${product_id}/candles?granularity=${granularity}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(config);
    const candles = response.data.map((candle) => ({
      open: candle[3],
      high: candle[2],
      low: candle[1],
      close: candle[4],
      time: Math.floor(candle[0]),
    }));
    res.json(candles);
  } catch (error) {
    console.error(error);
  }
};
export { getHistory };
