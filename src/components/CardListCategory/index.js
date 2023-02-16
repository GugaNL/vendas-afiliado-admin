import React, { useState, useContext } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { CheckAuthContext } from "../../contexts";
import { FaTrashAlt } from "react-icons/fa";
import { Puff } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Root, Container, BtnCard, BtnRemove, ContentLoader } from "./styles";
import ModalQuestion from "../ModalQuestion";
import { PAGE_NEW_CATEGORY } from "../../constants";
import { removeCategory } from "../../services/api";

const CardListCategory = (props) => {
  const { item = {} } = props;
  const { setIsLogged } = useContext(CheckAuthContext);
  const navigate = useNavigate();
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

  const confirmDelete = async () => {
    setLoading(true);
    const response = await removeCategory(item.id);
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
          description={`Deseja remover a categoria ${item?.name}?`}
          textBtnConfirm="Confirmar"
          handleConfirm={() => confirmDelete()}
          handleCloseModal={() => setShowModal(false)}
        />
      )}

      <Container
        onClick={() =>
          navigate({
            pathname: PAGE_NEW_CATEGORY,
            search: createSearchParams({
              categoryToEdit: item.id,
            }).toString(),
          })
        }
      >
        <BtnCard>
          <span>{item?.name}</span>
        </BtnCard>
      </Container>
      <BtnRemove onClick={() => setShowModal(true)}>
        <FaTrashAlt />
      </BtnRemove>
      <ToastContainer />
    </Root>
  );
};

export default CardListCategory;
