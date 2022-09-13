import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, starts: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        starts: total[language].starts + stargazers_count,
      };
    }
    return total;
  }, {});
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  // most star per language
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.starts - a.starts;
    })
    .map((item) => {
      return { ...item, value: item.starts };
    })
    .slice(0, 5);

  // stars, forks
  let { starts, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.starts[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    {
      starts: {},
      forks: {},
    }
  );
  starts = Object.values(starts).splice(-5).reverse();
  forks = Object.values(forks).splice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <Column3D data={starts} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
        <div></div>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
