/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("blog").del();
  await knex("blog").insert([
    {
      user_id: 1,
      title:
        "Using Empirical Data to Estimate Potential Functions in Commodity Markets: Some Initial Results",
      links:
        "https://scholar.google.co.uk/citations?view_op=view_citation&hl=en&user=aDyCOKEAAAAJ&cstart=20&pagesize=80&sortby=pubdate&citation_for_view=aDyCOKEAAAAJ:PELIpwtuRlgC",
      files: "AmirG_2025-02-19.png",
      content:
        "This paper focuses on estimating real and quantum potentials from financial commodities. The log returns of six common commodities are considered.",
    },
    {
      user_id: 2,
      title: "What is Econophysics?!",
      links:
        "https://medium.com/@hrish.relekar/econophysics-where-physics-meets-economics-6263914141e9",
      files: "AmirGholizad_2025-02-19.png",
      content:
        "Econophysics is a new field of science that studies the behavior of economic systems using the principles of physics. It is an interdisciplinary field that combines concepts from economics, physics, mathematics, and computer science to understand complex economic systems.",
    },
  ]);
}
