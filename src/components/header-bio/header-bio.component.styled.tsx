import styled from "styled-components";

export const HeaderBioWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 1px solid #fff;
  border-radius: 25px ;
  padding: 5px 10px;
  transition: linear .25s;
  &:hover{
    box-shadow: 2px 2px 3px black, inset 0 0 4px #fff;
    cursor: pointer;
  }
`;

export const HeaderBioAvatar = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid #fff;
`;


export const HeaderBioCoinImage = styled(HeaderBioAvatar)`
  border:none
  
`;