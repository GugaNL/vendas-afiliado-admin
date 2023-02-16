import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";
import {
  Container,
  Content,
  FieldContent,
  BtnConfirm,
  ContentLoader,
} from "./styles";
import ContentHeader from "../../components/ContentHeader";
import { PAGE_LIST_CATEGORIES } from "../../constants";
import {
  createCategory,
  findCategory,
  updateCategory,
} from "../../services/api";

const RegisterCategory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryToEdit = searchParams.get("categoryToEdit") || null;
  const [values, setValues] = useState({
    id: null,
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const loadCategory = async () => {
    const response = await findCategory(categoryToEdit);
    const { data: responseFindCategory = {} } = response;
    if (responseFindCategory && responseFindCategory.success) {
      const { category = {} } = responseFindCategory;
      setValues({
        id: category.id,
        name: category.name,
      });
    }
  };

  useEffect(() => {
    if (categoryToEdit) {
      loadCategory();
    }
  }, [categoryToEdit]);

  const onChangeInput = (element) => {
    const inputName = element.name;
    const inputValue = element.value;

    setValues({ ...values, [inputName]: inputValue });
  };

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

  const saveCategory = async () => {
    setLoading(true);

    const payload = {
      id: values.id,
      name: values.name,
    };

    if (values.id) {
      const response = await updateCategory(payload);
      const { data: responseUpdateCategory = {} } = response;

      if (responseUpdateCategory && responseUpdateCategory.success) {
        setLoading(false);
        showToast("Categoria alterada com sucesso", "success");
        setTimeout(() => {
          navigate(PAGE_LIST_CATEGORIES);
        }, 2500);
      } else {
        setLoading(false);
        showToast("Falha ao tentar alterar a categoria", "error");
      }
    } else {
      const response = await createCategory(payload);
      const { data: responseNewCategory = {} } = response;

      if (responseNewCategory && responseNewCategory.success) {
        setLoading(false);
        showToast("Categoria criada com sucesso", "success");
        setTimeout(() => {
          navigate(PAGE_LIST_CATEGORIES);
        }, 2500);
      } else {
        setLoading(false);
        showToast("Falha ao tentar criar a categoria", "error");
      }
    }
  };

  return (
    <Container>
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
      <ContentHeader
        title={values.id ? "Editar categoria" : "Nova categoria"}
        showFilters={false}
      />
      <Content>
        <FieldContent>
          <label>Nome</label>
          <input
            id="iptNameField"
            name="name"
            type="text"
            autoCapitalize="words"
            //autoComplete="given-name"
            //maxLength={INPUT_MAX_LENGTH}
            value={values.name || ""}
            onChange={(event) => onChangeInput(event.target)}
          />
        </FieldContent>

        <BtnConfirm>
          <button onClick={() => saveCategory()}>
            {values.id ? "Salvar" : "Criar"}
          </button>
        </BtnConfirm>
      </Content>
      <ToastContainer />
    </Container>
  );
};

export default RegisterCategory;
