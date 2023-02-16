import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";
import { Container, Content, FiltersLegends, ContentLoader, PaginationLib } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import CardList from "../../components/CardList";
import { listProducts } from "../../services/api";

const ListProducts = () => {
  const limit = 5;

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  //const [currentPage, setCurrentPage] = useState(0);
  //const [page, setPage] = useState(1);
  const [appliedFilter, setAppliedFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const pageCount = Math.ceil(totalProducts / limit);
  //const offset = currentPage * limit;

  const fetchList = async (page = 1, limit = 4) => {
    const response = await listProducts(page, limit);
    const { data: responseListProducts = {} } = response;

    if (responseListProducts && responseListProducts.success) {
      setLoading(false);
      const { products: { rows = [], count = 0 } = {} } = responseListProducts;
      setProducts(rows);
      setTotalProducts(count);
    } else {
      setLoading(false);
      toast.error("Falha ao listar produtos", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const filterList = (filterStatus) => {
    // if (filterStatus === appliedFilter) {
    //   setPrizeDraws(sorteios);
    //   setAppliedFilter('');
    // } else {
    //   setAppliedFilter(filterStatus);
    //   const filteredList = sorteios.filter(
    //     (item) => item.status === filterStatus
    //   );
    //   setPrizeDraws(filteredList);
    // }
  };

  function handlePageClick({ selected: selectedPage }) {
    //setCurrentPage(selectedPage);
    fetchList(selectedPage + 1, limit);
  }

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
      <ContentHeader title="Produtos" showFilters />
      <Content>
        {products.length > 0 &&
          products
            //.slice(offset, offset + PER_PAGE)
            .map((item, index) => <CardList item={item} key={index} />)}
      </Content>
      <PaginationLib
        breakLabel="..."
        pageRangeDisplayed={5}
        previousLabel={"← Anterior"}
        nextLabel={"Próximo →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      <ToastContainer />
    </Container>
  );
};

export default ListProducts;
