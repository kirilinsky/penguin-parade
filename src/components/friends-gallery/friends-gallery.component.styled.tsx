import styled from "styled-components";

export const FriendsGalleryWrapper = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const GallerySection = styled.section`
  flex: 0 0 75%;
  max-width: 75%;
  display: flex;
  flex-direction: column;

  @media (max-width: 992px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

export const AsideSection = styled.aside`
  flex: 0 0 25%;
  max-width: 25%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 3%;

  @media (max-width: 992px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;
