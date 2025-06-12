import styled from "styled-components";

export const ProgressBlockContainer = styled.div`
  display: flex;
  padding: 1em;
  gap: 1em;
  align-items: center;
  line-height: 1.5;
`;

export const ProgressBlockWrapper = styled.div`
  background: rgba(15, 25, 20, 0.5);
  padding: 1em;
  border-radius: 1em;
  border: 1px solid #1affb3;
  box-shadow: 0 0 8px rgba(26, 255, 179, 0.3),
    inset 0 0 10px rgba(26, 255, 179, 0.1);
  text-align: center;
  color: #b6ffec;
  max-width: 500px;
  margin: 0 auto;
`;

export const ProgressBlockLabel = styled.div`
  font-size: 18px;
  margin-bottom: 0.5em;
`;

export const ProgressBlockBarWrapper = styled.div`
  width: 100%;
  height: 18px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  border: 1px solid #1affb3;
`;

export const ProgressBlockBarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #1affb3, #3fffa8);
  box-shadow: 0 0 6px rgba(26, 255, 179, 0.6);
  transition: width 0.4s ease-in-out;
`;

export const ProgressBlockContent = styled.div`
  font-size: 21px;
  padding-inline: 0.4em;

  white-space: normal;
  word-wrap: break-word;
  hyphens: auto;
  text-align: justify;
  line-height: 1.4;
  color: #e0fefb;
  text-shadow: 0 0 3px #0ff;
  p {
    text-align: center;
  }
`;

export const ProgressBlockGoalNote = styled.div`
  margin-top: 0.5em;
  font-size: 14px;
  color: #93fce3;
`;
