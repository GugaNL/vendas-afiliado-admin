import React, { useMemo, useState, useContext } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { Puff } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckAuthContext } from "../../contexts";
import {
  Root,
  Container,
  TagColor,
  BtnCard,
  BtnRemove,
  ContentLoader,
} from "./styles";
import { PAGE_NEW_PRODUCT } from "../../constants";
import ModalQuestion from "../ModalQuestion";
import { removeProduct } from "../../services/api";

const CardList = (props) => {
  const { item = {} } = props;
  const navigate = useNavigate();
  const { setIsLogged } = useContext(CheckAuthContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const showToast = (message, type) => {
    if (type === "success") {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };

  const tagColor = useMemo(() => {
    let color = (props) => props.theme.color.danger;
    if (item?.store === "amazon" || item?.store === "Amazon") {
      color = (props) => props.theme.color.green;
    } else if (item?.store === "shopee" || item?.store === "Shopee") {
      color = (props) => props.theme.color.blue;
    }

    return color;
  }, [item?.store]);

  const confirmDelete = async () => {
    setLoading(true);
    const response = await removeProduct(item.id);
    const { data: responseRemoveCategory = {} } = response;

    if (responseRemoveCategory && responseRemoveCategory.success) {
      setShowModal(false);
      setLoading(false);
      showToast("Categoria removida com sucesso", "success");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      setShowModal(false);
      if (response === 401) {
        setIsLogged();
      } else {
        setLoading(false);
        const errorMsg = response
          ? response
          : "Falha ao tentar remover a categoria";
        showToast(errorMsg, "error");
      }
    }
  };

  return (
    <Root>
      {loading && (
        <ContentLoader>
          <Puff
            height="200"
            width="200"
            radisu={1}
            color="#4fa94d"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </ContentLoader>
      )}

      {showModal && (
        <ModalQuestion
          title="Atenção"
          description={`Deseja remover o produto ${item.title}?`}
          textBtnConfirm="Confirmar"
          handleConfirm={() => confirmDelete()}
          handleCloseModal={() => setShowModal(false)}
        />
      )}
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
      <BtnRemove onClick={() => setShowModal(true)}>
        <FaTrashAlt />
      </BtnRemove>
      <ToastContainer />
    </Root>
  );
};

export default CardList;
