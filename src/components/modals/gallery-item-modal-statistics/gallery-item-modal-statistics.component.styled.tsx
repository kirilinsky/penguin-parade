import styled from "styled-components";

// Accent color is themed per-penguin rarity via the `--accent` CSS var,
// set inline on the grid by the component. Falls back to the site's neon green.
export const GalleryItemModalStatisticsGrid = styled.div`
  display: grid;
  gap: 0.7em;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  animation: fadeIn 0.45s ease-in-out;
  > * {
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
  }
  @media (max-width: 888px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const GalleryItemModalStatisticsExpedition = styled.div`
  border: 1px solid var(--accent, #2de191);
  border-radius: 12px;
  grid-column: 1 / -1;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4em;
  background: color-mix(in srgb, var(--accent, #2de191) 8%, transparent);
  box-shadow: 0 0 14px color-mix(in srgb, var(--accent, #2de191) 22%, transparent);
  backdrop-filter: blur(4px);
`;

export const GalleryItemModalStatisticsDes = styled.p`
  grid-column: 1 / -1;
  margin: 0 0 0.2em;
  font-size: 1.05rem;
  font-style: italic;
  white-space: normal;
  word-wrap: break-word;
  hyphens: auto;
  line-height: 1.55;
  color: #e6fff9;
  padding: 0.2em 0 0.2em 0.85em;
  border-left: 3px solid var(--accent, #2de191);

  @media (max-width: 888px) {
    font-size: 0.95rem;
    grid-column: span 2;
  }
`;

export const GalleryItemModalStatisticsItem = styled.div`
  grid-column: span 2;
  border: 1px solid color-mix(in srgb, var(--accent, #2de191) 50%, transparent);
  border-radius: 12px;
  padding: 0.6em 0.85em;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05),
    rgba(0, 0, 0, 0.22)
  );
  box-shadow: 0 0 10px color-mix(in srgb, var(--accent, #2de191) 16%, transparent),
    inset 0 0 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.15s ease, box-shadow 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--accent, #2de191);
    box-shadow: 0 0 18px color-mix(in srgb, var(--accent, #2de191) 36%, transparent);
  }

  h3 {
    margin: 0 0 0.35em;
    border: none;
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: var(--accent, #2de191);
    opacity: 0.9;
  }

  p {
    margin: 0;
    text-transform: capitalize;
    color: #f3fffb;
    font-size: 0.98rem;
    line-height: 1.3;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 888px) {
    font-size: 15px;
    grid-column: span 2;
  }
`;

export const GalleryItemModalStatisticsTrait = styled(
  GalleryItemModalStatisticsItem
)`
  grid-column: span 1;
  text-align: center;

  @media (max-width: 888px) {
    grid-column: span 1;
  }
`;
