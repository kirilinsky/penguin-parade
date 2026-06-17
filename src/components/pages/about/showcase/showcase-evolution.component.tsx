"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { EvolutionEffect } from "@/components/pages/evolution/evolution-effect/evolution-effect";
import EvolutionGridContainer from "@/components/pages/evolution/evolution-grid-container/evolution-grid-container.component";
import EvolutionGridItem from "@/components/pages/evolution/evolution-grid-item/evolution-grid-item.component";
import {
  EvolutionGridItemCenterStyled,
  EvolutionGridItemCenterWrap,
} from "@/components/pages/evolution/evolution-grid-item/evolution-grid-item.component.styled";
import NeonButtonComponent from "@/components/ui/neon-button/neon-button.component";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import { getNextScale } from "@/helpers/get-next-scale/get-next-scale";
import { getLocalized } from "@/helpers/get-localized/get-localized";
import { showcaseEvolutionSamples } from "@/data/showcase";
import { useL } from "./showcase-l10n";
import {
  ShowcaseSection,
  ShowcaseSectionSub,
  ShowcaseSectionTitle,
} from "./showcase-section.styled";

const SLOTS = ["tla", "tc", "tra", "mlc", "mrc", "bla", "bc", "bra"];

const ShowcaseEvolution = () => {
  const L = useL();
  const locale = useLocale();
  const samples = showcaseEvolutionSamples;

  const [inProgress, setInProgress] = useState(false);
  const [result, setResult] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  if (samples.length < 8) return null;

  const rarity = samples[0].settings?.rarity;
  const currentColor = rarity ? getBaseColorByScale(rarity) : "transparent";
  const nextScale = rarity ? getNextScale(rarity) : null;
  const nextColor = nextScale ? getBaseColorByScale(nextScale) : currentColor;
  const resultPenguin = samples[0];

  const runDemo = () => {
    setInProgress(true);
    setResult(false);
    timer.current = setTimeout(() => {
      setInProgress(false);
      setResult(true);
    }, 3200);
  };

  const reset = () => {
    if (timer.current) clearTimeout(timer.current);
    setInProgress(false);
    setResult(false);
  };

  return (
    <ShowcaseSection>
      <ShowcaseSectionTitle>{L("Evolution", "Эволюция")}</ShowcaseSectionTitle>
      <ShowcaseSectionSub>
        {L(
          "Eight penguins of the same rarity could be fused into a single penguin of the next tier. This is a visual demo of that ritual — no real penguins are consumed.",
          "Восемь пингвинов одной редкости можно было слить в одного пингвина следующего уровня. Это визуальная демонстрация ритуала — настоящие пингвины не расходуются."
        )}
      </ShowcaseSectionSub>

      <EvolutionGridContainer hide={false} target={currentColor}>
        {SLOTS.map((key, i) => (
          <EvolutionGridItem
            key={key}
            gridarea={key}
            bordercolor={currentColor}
            result={inProgress || result}
            value={samples[i]?.imageUrl ?? null}
          >
            {null}
          </EvolutionGridItem>
        ))}

        <EvolutionGridItemCenterWrap>
          <EvolutionGridItemCenterStyled
            bordercolor={nextColor}
            gridarea="c"
            level={100}
            result={result}
            bg={result ? resultPenguin.imageUrl : null}
          >
            {!result && !inProgress && (
              <NeonButtonComponent title={L("Evolve", "Эволюция")} onClick={runDemo} />
            )}
            {inProgress && <EvolutionEffect />}
          </EvolutionGridItemCenterStyled>
        </EvolutionGridItemCenterWrap>
      </EvolutionGridContainer>

      {result && (
        <div style={{ textAlign: "center", marginTop: "1.5em" }}>
          <p style={{ marginBottom: "0.6em" }}>
            {L("Evolved into", "Превратились в")}:{" "}
            <strong>{getLocalized(resultPenguin.settings?.t, locale)}</strong>
          </p>
          <NeonButtonComponent title={L("Replay", "Ещё раз")} onClick={reset} />
        </div>
      )}
    </ShowcaseSection>
  );
};

export default ShowcaseEvolution;
