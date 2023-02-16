import styled, { keyframes } from "styled-components";

const animate = keyframes`
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    transform: translateX(0px);
    opacity: 1;
  }

`;

export const Root = styled.div`
  display: flex;
  align-items: center;
`;

export const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.color.gray};
  list-style: none;
  border-radius: 5px;
  margin: 10px 0%;
  padding: 12px 10px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  color: ${(props) => props.theme.color.white};
  animation: ${animate} 0.5s ease;
  width: 80%;

  &:hover {
    opacity: 0.7;
    transform: translateX(10px);
  }
`;

export const BtnCard = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.color.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 10px;

  > span {
    font-size: 18px;
    font-weight: bold;
  }
`;

export const BtnRemove = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 5px;
  margin-left: 15px;
  background-color: ${(props) => props.theme.color.orange};
  transition: all 0.3s;

  &:hover {
    opacity: 0.7;

    > svg {
      transform: translateY(-1px);
    }
  }

  > svg {
    color: ${(props) => props.theme.color.white};
    font-size: 16px;
  }
`;


export const ContentLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(60, 60, 60, 0.7);
  z-index: 1;
`;