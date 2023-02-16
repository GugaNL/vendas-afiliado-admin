import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";
import { Container, Content, ContentLoader } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import CardListCategory from "../../components/CardListCategory";
import { listCategories } from "../../services/api";
import {CheckAuthContext} from "../../contexts";

const ListCategories = () => {
  const { setIsLogged } = useContext(CheckAuthContext);
  const [categories, setCategories] = useState([]);
  //const [appliedFilter, setAppliedFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    const response = await listCategories();
    const { data: responseListCategories = {} } = response;

    if (responseListCategories && responseListCategories.success) {
      setLoading(false);
      const { categories = [] } = responseListCategories;
      setCategories(categories);
    } else {
      setLoading(false);
      if (response === 401) {
        setIsLogged();
      } else {
        toast.error("Falha ao listar as categorias", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const filterList = (filterStatus) => {
    // if (filterStatus === appliedFilter) {
    //   setCategories(categories);
    //   setAppliedFilter("");
    // } else {
    //   setAppliedFilter(filterStatus);
    //   const filteredList = categories.filter(
    //     (item) => item.status === filterStatus
    //   );
    //   setCategories(filteredList);
    // }
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
      <ContentHeader title="Categorias" showFilters={false} />
      <Content>
        {categories.length > 0 &&
          categories.map((item, index) => (
            <CardListCategory item={item} key={index} />
          ))}
      </Content>
      <ToastContainer />
    </Container>
  );
};

export default ListCategories;
