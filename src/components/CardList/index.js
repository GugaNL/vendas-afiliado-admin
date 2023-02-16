import React, { useMemo } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Container, TagColor, BtnCard } from "./styles";
import { PAGE_NEW_PRODUCT } from "../../constants";

const CardList = (props) => {
  const { item = {} } = props;
  const navigate = useNavigate();

  const tagColor = useMemo(() => {
    let color = (props) => props.theme.color.danger;
    if (item?.store === "amazon" || item?.store === "Amazon") {
      color = (props) => props.theme.color.green;
    } else if (item?.store === "shopee" || item?.store === "Shopee") {
      color = (props) => props.theme.color.blue;
    }

    return color;
  }, [item?.store]);

  return (
    <Container
      onClick={() =>
        navigate({
          pathname: PAGE_NEW_PRODUCT,
          search: createSearchParams({ productToEdit: item.id }).toString(),
        })
      }
    >
      <TagColor colorStatus={tagColor} />
      <BtnCard>
        <span>{item?.title}</span>
        <small>{item?.store}</small>
      </BtnCard>
    </Container>
  );
};

export default CardList;
