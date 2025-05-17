"use client";

import EvolutionGridContainer from "@/components/evolution-grid-container/evolution-grid-container.component";
import EvolutionGridItem from "@/components/evolution-grid-item/evolution-grid-item.component";
import NeonButtonComponent from "@/components/neon-button/neon-button.component";
import React from "react";
import styled from "styled-components";

const EvolvePage = () => {
  return (
    <>
      <EvolutionGridContainer>
        <EvolutionGridItem gridarea="tla"> </EvolutionGridItem>
        <EvolutionGridItem gridarea="tc"> </EvolutionGridItem>
        <EvolutionGridItem gridarea="tra"> </EvolutionGridItem>
        <EvolutionGridItem gridarea="mlc"> </EvolutionGridItem>
        <EvolutionGridItem gridarea="c">
          <NeonButtonComponent title="Evolve" />
        </EvolutionGridItem>
        <EvolutionGridItem gridarea="mrc"> </EvolutionGridItem>
        <EvolutionGridItem gridarea="bla"> </EvolutionGridItem>
        <EvolutionGridItem gridarea="bc"> </EvolutionGridItem>
        <EvolutionGridItem gridarea="bra"> </EvolutionGridItem>
      </EvolutionGridContainer>
    </>
  );
};

export default EvolvePage;
