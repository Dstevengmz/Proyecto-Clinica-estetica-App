import React from "react";
import { Outlet } from "react-router-dom";
import NavbarPublico from "../components/Publico/NavbarPublico";
import FooterPublico from "../components/Publico/FooterPublico";

function PublicLayout() {
  return (
    <>
      <NavbarPublico />
      <main >
        <Outlet />
      </main>
  <FooterPublico />
    </>
  );
}

export default PublicLayout;