import styled from "styled-components";
import ReactPaginate from "react-paginate";

export const Container = styled.div``;

export const Content = styled.div``;

export const FiltersLegends = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  .filter-legend {
    font-size: 18px;
    font-weight: 500;
    background: none;
    color: ${(props) => props.theme.color.white};
    margin: 0 15px;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }

  .progress::after {
    content: "";
    display: block;
    width: 55px;
    margin: 0 auto;
    border: 6px solid ${(props) => props.theme.color.green};
  }

  .finished::after {
    content: "";
    display: block;
    width: 55px;
    margin: 0 auto;
    border: 6px solid ${(props) => props.theme.color.blue};
  }

  .canceled::after {
    content: "";
    display: block;
    width: 55px;
    margin: 0 auto;
    border: 6px solid ${(props) => props.theme.color.danger};
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

export const PaginationLib = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  list-style: none;

  > li {
    padding: 12px;
  }

  > li > a {
    cursor: pointer;
    color: ${(props) => props.theme.color.white};
  }

  > h1 {
    color: #6c7ac9;
  }

  .pagination > a {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #6c7ac9;
    color: #6c7ac9;
  }

  .pagination__link {
    font-weight: bold;
    //color: ${(props) => props.theme.color.white};
  }

  .pagination__link--active a {
    //color: #fff;
    background: #6c7ac9;
    padding: 3px 6px;
    border-radius: 3px;
  }

  .pagination__link--disabled a {
    //color: ${(props) => props.theme.color.white};
    opacity: 0.5;
    cursor: auto;
  }
`;
