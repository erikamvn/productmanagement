import React from "react";
import { render } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import ProductNew from "@/components/products/ProductNew";

test("deve renderizar corretamente e coincidir com o snapshot", () => {
  const { asFragment } = render(
    <>
      <ToastContainer /> {/* Para evitar erro com toast */}
      <ProductNew />
    </>
  );

  expect(asFragment()).toMatchSnapshot();
});
