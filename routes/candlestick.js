import WebSocket from "ws";

export default function coinbase(io) {
  const coinbaseSocket = new WebSocket("wss://ws-feed.exchange.coinbase.com");

  let currentCandle = null;
  let currentInterval = null;
  const candleDuration = 60 * 1000; // 1-minute candles

  coinbaseSocket.on("open", () => {
    const subscribeMessage = {
      type: "subscribe",
      product_ids: ["BTC-USD"],
      channels: ["ticker"],
    };
    coinbaseSocket.send(JSON.stringify(subscribeMessage));
    console.log("✅ Connected to Coinbase WebSocket");
  });

  coinbaseSocket.on("message", (data) => {
    const parsedData = JSON.parse(data);
    if (parsedData.type === "ticker") {
      const price = parseFloat(parsedData.price);
      const timestamp = new Date(parsedData.time).getTime();

      if (!currentCandle) {
        currentInterval =
          Math.floor(timestamp / candleDuration) * candleDuration;
        currentCandle = {
          time: new Date(currentInterval),
          open: price,
          high: price,
          low: price,
          close: price,
        };
      } else if (timestamp < currentInterval + candleDuration) {
        currentCandle.high = Math.max(currentCandle.high, price);
        currentCandle.low = Math.min(currentCandle.low, price);
        currentCandle.close = price;
      } else {
        // Emit completed candle
        io.emit("candleUpdate", currentCandle);
        console.log("🕯️ New Candle:", currentCandle);

        // Start new candle
        currentInterval =
          Math.floor(timestamp / candleDuration) * candleDuration;
        currentCandle = {
          time: new Date(currentInterval),
          open: price,
          high: price,
          low: price,
          close: price,
        };
      }
    }
  });

  coinbaseSocket.on("error", (error) => {
    console.error("🚨 Coinbase WebSocket Error:", error);
  });

  coinbaseSocket.on("close", () => {
    console.log("❌ Coinbase WebSocket closed");
  });
}
