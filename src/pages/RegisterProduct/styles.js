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
  }

  > select {
    padding: 8px;
    border-radius: 5px;
    width: 350px;
    margin-top: 3px;
    background-color: ${(props) => props.theme.color.white};
  }

  .btn-add {
    width: fit-content;
    margin-top: 10px;
    align-self: center;
    background: none;
  }

  .btn-minus {
    width: fit-content;
    background: none;
  }

  .btn-upload {
    background: none;
    border: 1.5px dashed ${(props) => props.theme.color.gray};
    border-radius: 3px;
    margin-top: 8px;
  }

  .btn-upload > svg {
    font-size: 42px;
  }

  > button > svg {
    font-size: 26px;
    color: ${(props) => props.theme.color.info};
  }

  > img {
    max-width: 250px;
    //width: 100%;
  }

  .input-title {
    //width: 400px;
  }

  .input-brand {
    width: 200px;
  }

  .input-price {
    width: 150px;
  }

  .input-discount {
    width: 150px;
  }
`;

export const ContentInputDesc = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;

  > input {
    padding: 8px;
    border-radius: 5px;
    margin-top: 3px;
    width: 100%;
  }

  > button > svg {
    font-size: 28px;
    color: ${(props) => props.theme.color.orange};
    margin-right: 10px;
  }
`;

export const ContentUploadImage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 350px;
  height: 300px;
  border: 1px solid ${(props) => props.theme.color.gray};
  margin-top: 40px;
  z-index: 0;
  //overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const BtnDeleteImg = styled.button`
  position: absolute;
  right: -20px;
  top: -20px;
  background: ${(props) => props.theme.color.white};
  border-radius: 20px;
  padding: 6px 8px;
  transition: opacity 0.3;

  &:hover {
    opacity: 0.9;
  }

  > svg {
    color: ${(props) => props.theme.color.black};
    font-size: 24px;
  }
`;

export const ContainerImagesUpload = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 30px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
    justify-items: center;
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

export const ContentPrizeDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  align-items: center;
`;

export const ContainerTicket = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 400px;

  @media (max-width: 435px) {
    flex-direction: column;
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

export const BtnNumbers = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    padding: 13px 8px;
    border-radius: 5px;
    background: ${(props) => props.theme.color.orange};
    color: ${(props) => props.theme.color.white};
    font-size: 15px;
    font-weight: bold;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transition: opacity 0.3;

    &:hover {
      opacity: 0.8;
    }

    > svg {
      margin-right: 8px;
    }
  }
`;

export const inputBrand = styled.input``;

export const EmptyErrorText = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.color.darkBlue};
  margin-top: 3px;
`;

export const IframeUrlText = styled.textarea`
  padding: 8px;
  border-radius: 5px;
  margin-top: 3px;
`;

export const FieldContentCheckbox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
  color: ${(props) => props.theme.color.white};

  > input {
    margin-left: 5px;
  }
`;

export const ImagePathUrl = styled.img`
  width: 200px;
  height: 200px;
`;

export const PreviewBtn = styled.button`
  width: 100px;
  margin-top: 12px;
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.color.darkBlue};
  color: ${(props) => props.theme.color.white};
`;

export const ContentRadios = styled.div`
  display: flex;
  color: ${(props) => props.theme.color.white};
  margin-top: 25px;

  > div {
    padding-right: 16px;
  }
`;
