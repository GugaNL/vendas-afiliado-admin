import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.div``;

export const FieldContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  color: ${(props) => props.theme.color.white};

  > input {
    padding: 8px;
    border-radius: 5px;
    margin-top: 3px;
    max-width: 200px;
  }
`;

export const BtnConfirm = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;

  > button {
    width: 300px;
    padding: 15px 10px;
    border-radius: 5px;
    background: ${(props) => props.theme.color.success};
    color: ${(props) => props.theme.color.white};
    font-size: 16px;
    font-weight: bold;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transition: opacity 0.3;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const ContentLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
`;
