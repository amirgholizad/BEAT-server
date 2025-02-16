/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("indicator").del();
  await knex("indicator").insert([
    {
      id: 1,
      name: "SMA",
      type: "trend",
      language: "JavaScript",
      license: "FREE",
      description: "Simple Moving Average",
      code: "function sma(data, period) { return data.reduce((a, b) => a + b, 0) / period; }",
      rating: "4.5",
      rating_count: 10,
      user_id: 1,
    },
    {
      id: 2,
      name: "EMA",
      type: "trend",
      language: "python",
      license: "PREMIUM",
      description: "Exponential Moving Average",
      code: "def ema(data, period): return sum(data) / period",
      rating: "4.8",
      rating_count: 20,
      user_id: 2,
    },
  ]);
}
