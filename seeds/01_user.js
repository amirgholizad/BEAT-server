/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("user").del();
  await knex("user").insert([
    {
      id: 1,
      user_name: "AmirG",
      email: "agholizadgha@mun.ca",
      password: "12345678",
    },
    {
      id: 2,
      user_name: "AmirGholizad",
      email: "a.m.gholizad@gmail.com",
      password: "87654321",
    },
  ]);
}
