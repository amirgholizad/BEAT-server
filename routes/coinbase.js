import WebSocket from "ws";

export default function coinbase(io) {
  // WebSocket connection to Coinbase
  const coinbaseSocket = new WebSocket("wss://ws-feed.exchange.coinbase.com");

  coinbaseSocket.on("open", () => {
    const subscribeMessage = {
      type: "subscribe",
      product_ids: ["BTC-USD"], // Can add more pairs if needed
      channels: ["ticker"],
    };
    coinbaseSocket.send(JSON.stringify(subscribeMessage));
    console.log("✅ Connected to Coinbase WebSocket");
  });

  // Handle incoming data from Coinbase WebSocket
  coinbaseSocket.on("message", (data) => {
    const parsedData = JSON.parse(data);
    if (parsedData.type === "ticker") {
      console.log("📈 Price Update:", parsedData);
      // Emit real-time data to frontend via Socket.IO
      setTimeout(() => {
        io.emit("priceUpdate", {
          parsedData,
        });
      }, 1000);
    }
  });

  // Handle WebSocket errors
  coinbaseSocket.on("error", (error) => {
    console.error("🚨 Coinbase WebSocket Error:", error);
  });

  coinbaseSocket.on("close", () => {
    console.log("❌ Coinbase WebSocket closed");
  });
}
