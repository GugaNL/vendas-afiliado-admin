import React from "react";
import { Routes, Route } from "react-router-dom";
import ListPrizeDraws from "../pages/ListPrizeDraws";
import Layout from "../components/Layout";
import RegisterProduct from "../pages/RegisterProduct";
import {
  PAGE_NEW_PRODUCT,
  PAGE_LIST_PRODUCTS,
} from "../constants";

const AppRoutes = () => (
  <Layout>
    <Routes>
      <Route path={PAGE_LIST_PRODUCTS} element={<ListPrizeDraws />} />
      <Route path={PAGE_NEW_PRODUCT} element={<RegisterProduct />} />
    </Routes>
  </Layout>
);

export default AppRoutes;
