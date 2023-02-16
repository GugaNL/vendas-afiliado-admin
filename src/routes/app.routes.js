import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import ListProducts from "../pages/ListProducts";
import RegisterProduct from "../pages/RegisterProduct";
import ListCategories from "../pages/ListCategories";
import RegisterCategory from "../pages/RegisterCategory";
import {
  PAGE_NEW_PRODUCT,
  PAGE_LIST_PRODUCTS,
  PAGE_NEW_CATEGORY,
  PAGE_LIST_CATEGORIES
} from "../constants";

const AppRoutes = () => (
  <Layout>
    <Routes>
      <Route path={PAGE_LIST_PRODUCTS} element={<ListProducts />} />
      <Route path={PAGE_NEW_PRODUCT} element={<RegisterProduct />} />
      <Route path={PAGE_LIST_CATEGORIES} element={<ListCategories />} />
      <Route path={PAGE_NEW_CATEGORY} element={<RegisterCategory />} />
    </Routes>
  </Layout>
);

export default AppRoutes;
