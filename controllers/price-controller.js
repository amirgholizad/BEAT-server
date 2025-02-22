import axios from "axios";

const getHistory = async (req, res) => {
  const product_id = `${req.query.product_id}`;
  const granularity = `${req.query.granularity}`;
  const start = `${req.query.start}`;
  const end = `${req.query.end}`;
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.exchange.coinbase.com/products/${product_id}/candles?granularity=${granularity}&start=${start}&end=${end}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(config);
    const candles = response.data.map((candle) => ({
      time: candle[0],
      low: candle[1],
      high: candle[2],
      open: candle[3],
      close: candle[4],
      volume: candle[5],
    }));
    res.json(candles);
  } catch (error) {
    console.error(error);
  }
};
export { getHistory };
