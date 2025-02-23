import WebSocket from "ws";

export default function binance(io) {
  // WebSocket connection to Binance for 5-minute candlesticks on BTC/USDT
  const binanceSocket = new WebSocket(
    "wss://stream.binance.com:9443/ws/btcusdt@kline_5m"
  );

  binanceSocket.on("open", () => {
    console.log("✅ Connected to Binance WebSocket");
  });

  // Handle incoming data from Binance WebSocket
  binanceSocket.on("message", (data) => {
    const parsedData = JSON.parse(data);
    if (parsedData.e === "kline") {
      const kline = parsedData.k;
      //   console.log("📊 5-Min Candlestick Data:", kline);

      // Emit real-time data to frontend via Socket.IO
      io.emit("candlestickUpdate", {
        time: kline.t, // Start time of the candlestick
        open: kline.o, // Open price
        high: kline.h, // High price
        low: kline.l, // Low price
        close: kline.c, // Close price
        volume: kline.v, // Volume
        isFinal: kline.x, // Whether the candlestick is closed
      });
    }
  });

  // Handle WebSocket errors
  binanceSocket.on("error", (error) => {
    console.error("🚨 Binance WebSocket Error:", error);
  });

  binanceSocket.on("close", () => {
    console.log("❌ Binance WebSocket closed");
  });
}
