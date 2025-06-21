import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const AboutPageContainer = styled.div`
  padding: 4rem 2rem;

  margin: 0 auto;
`;

export const AboutPageSectionBlock = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "reverse",
})<{ reverse?: boolean }>`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  gap: 1px;}

  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
`;

export const AboutPageSectionImage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 50%;
    height: 100%;

    @media (max-width: 768px) {
      width: 99%;
    }
  }
`;

export const AboutPageSectionText = styled.div`
  flex: 1;
  color: #ffffff;
  font-size: 1.2rem;
  line-height: 1.7;
  background: linear-gradient(135deg, #0f0f0f 40%, #111111 100%);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px #00ffe0, 0 0 30px #00aaff33;
  border: 1px solid #00f0ff33;
  transition: 0.3s ease;
  &:hover {
    box-shadow: 0 0 15px #00ffee88, 0 0 20px #00ffee44;
  }
`;
