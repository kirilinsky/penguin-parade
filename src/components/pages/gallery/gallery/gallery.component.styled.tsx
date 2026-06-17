import styled from "styled-components";

export const GalleryWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));
  gap: 2.2rem;
  width: 100%;

  /* skip render/layout of off-screen cards — keeps long galleries smooth */
  > * {
    content-visibility: auto;
    contain-intrinsic-size: auto 380px;
  }
`;
