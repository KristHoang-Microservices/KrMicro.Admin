import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Loading } from "../../components/Loading";
import { IncomePage } from "../../pages/orders/IncomePage";
import { OrdersPage } from "../../pages/orders/OrdersPage";
import { UsersPage } from "../../pages/identity/UsersPage";
import { AscPage } from "../../pages/masterData/AscPage";
import { CategoryPage } from "../../pages/masterData/CategoryPage";
import { ProductsPage } from "../../pages/masterData/ProductsPage";
import { BrandPage } from "../../pages/masterData/BrandsPage";
import { DiscountPage } from "../../pages/masterData/DiscountPage";

export function DashboardRoute() {
  return (
    <Routes>
      {/*<Route*/}
      {/*  path={"/dashboard"}*/}
      {/*  element={*/}
      {/*    <Suspense fallback={<Loading />}>*/}
      {/*      <DashboardPage />*/}
      {/*    </Suspense>*/}
      {/*  }*/}
      {/*/>*/}
      <Route
        path={"/income"}
        element={
          <Suspense fallback={<Loading />}>
            <IncomePage />
          </Suspense>
        }
      />
      <Route
        path={"/orders"}
        element={
          <Suspense fallback={<Loading />}>
            <OrdersPage />
          </Suspense>
        }
      />
      <Route
        path={"/users"}
        element={
          <Suspense fallback={<Loading />}>
            <UsersPage />
          </Suspense>
        }
      />
      <Route
        path={"/asc"}
        element={
          <Suspense fallback={<Loading />}>
            <AscPage />
          </Suspense>
        }
      />
      <Route
        path={"/category"}
        element={
          <Suspense fallback={<Loading />}>
            <CategoryPage />
          </Suspense>
        }
      />
      <Route
        path={"/products"}
        element={
          <Suspense fallback={<Loading />}>
            <ProductsPage />
          </Suspense>
        }
      />
      <Route
        path={"/brands"}
        element={
          <Suspense fallback={<Loading />}>
            <BrandPage />
          </Suspense>
        }
      />
      <Route
        path={"/discount"}
        element={
          <Suspense fallback={<Loading />}>
            <DiscountPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
