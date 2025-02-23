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
        "This paper focuses on estimating real and quantum potentials from financial commodities. The log returns of six common commodities are considered. We find that some phenomena, such as the vertical potential walls and the time scale issue of the variation on returns, also exists in commodity markets. By comparing the quantum and classical potentials, we attempt to demonstrate that the information within these two types of potentials is different. We believe this empirical result is consistent with the theoretical assumption that quantum potentials (when embedded into social science contexts) may contain some social cognitive or market psychological information, while classical potentials mainly reflect ‘hard’ market conditions. We also compare the two potential forces and explore their relationship by simply estimating the Pearson correlation between them.",
    },
    {
      user_id: 2,
      title: "What is Econophysics?!",
      links:
        "https://medium.com/@hrish.relekar/econophysics-where-physics-meets-economics-6263914141e9",
      files: "AmirGholizad_2025-02-19.png",
      content:
        "Within the past couple of decades, several new approaches to financial time series have emerged, with those explored by physicists falling under the field known as “econophysics”. Econophysics is an interdisciplinary field referred to as a science and methodology that studies financial markets and economic events as physical systems. It uses theories and techniques initially created by physicists to address economic problems and covers study areas such as climate economics, economic networks, emergent phenomena, financial time-series, image processing, adaptive behavior, market microstructure, risk management, social dynamics, quantum social science, and wealth and income inequality. The term econophysics was coined by Eugene Stanley, an American physicist, in the mid-1990s, and the field has grown as a branch of both physics and economics. One of the newest models employed by econophysicists is David Bohm’s causal interpretation of quantum mechanics, well known as pilot wave theory.",
    },
  ]);
}
