import axios from "axios";

const getHistory = async (req, res) => {
  const product_id = req.body.product_id;
  const granularity = req.body.granularity;
  const start = req.body.start;
  const end = req.body.end;
  // const end = new Date();
  // const start = new Date(end.getTime() - 60 * 60 * 1000); // Last 1 hour
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
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
};
export { getHistory };
