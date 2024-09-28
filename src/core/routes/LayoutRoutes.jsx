import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./Routes";
import AsideWrapper from "../../views/components/Asides/AsideWrapper";
import { useSelector } from "react-redux";
import PermissionsEnum from "../utils/rolesAndPermissionsMaps";
import lazy from "../../views/components/LazyLoadWithRetry/LazyLoadWithRetry";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const PageWrapper = lazy(() =>
  import("../../views/components/PageWrapper/PageWrapper")
);
// const DefaultFooter = lazy(() =>
//   import('../../views/components/Footers/MainFooter')
// );
// const DefaultHeader = lazy(() =>
//   import('../../views/components/Headers/MainHeader')
// );
// const DefaultSidebar = lazy(() =>
//   import("../../views/components/Asides/AdminSidebar")
// );

const checkPermission = (permissions, route) => {
  if (route.permission === "MAIN") {
    const modulePermissions = PermissionsEnum[route.module];
    if (!modulePermissions) return false;
    const { ALL, VIEW, DATATABLE } = modulePermissions;
    const permissionKeys = [ALL, VIEW, DATATABLE];
    return permissions.some((permission) =>
      permissionKeys.includes(permission.name)
    );
  }

  if (route.permission) {
    const dynamicPermissionKey =
      PermissionsEnum[route.module]?.[route.permission];
    const allPermissionKey = PermissionsEnum[route.module]?.ALL;
    return permissions?.find(
      (permission) =>
        permission.name === allPermissionKey ||
        permission.name === dynamicPermissionKey
    );
  }

  return true;
};

const GenericRoutes = ({ type }) => {
  const permissions = useSelector((state) => state.auth.user?.permissions);
  //  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isAuthenticated = true;

  const renderElement = (route) => {
    if (route.isProtected && !isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (route.isAuthRoute && isAuthenticated) {
      return <Navigate to="/home" replace />;
    }

    if (!route.isProtected || isAuthenticated) {
      const hasPermission = route.permission
        ? checkPermission(permissions, route)
        : true;
      switch (type) {
        case "page":
          const isSidebarExists =
            route.aside !== null || !route.hasOwnProperty("aside");
          return hasPermission ? (
            <PageWrapper module={route.module} isSidebar={isSidebarExists}>
              {route.page}
            </PageWrapper>
          ) : (
            <div style={accessDeniedStyle}>
              <Typography variant="h5">Access Denied for this Page</Typography>
              <Button
                component={Link}
                to="/"
                variant="contained"
                size="small"
                style={goBackButtonStyle}
              >
                Go Back To Home Page
              </Button>
            </div>
          );
        // case "header":
        //   return route.hasOwnProperty("header") ? (
        //     route.header
        //   ) : (
        //     <DefaultHeader />
        //   );
        // case "footer":
        //   return route.hasOwnProperty("footer") ? (
        //     route.footer
        //   ) : (
        //     <DefaultFooter />
        //   );
        case "aside":
          if (route.hasOwnProperty("aside")) {
            return route.aside !== null ? (
              <AsideWrapper>{route.aside}</AsideWrapper>
            ) : (
              <></>
            );
          } else {
            return <AsideWrapper>{/* <DefaultSidebar /> */}</AsideWrapper>;
          }
        default:
          return <></>;
      }
    }
  };

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={`${type}-Route-${index}`}
          path={route.path}
          element={renderElement(route)}
        />
      ))}
      {type === "page" && <Route path="/" element={<Navigate to="/home" />} />}
    </Routes>
  );
};

const accessDeniedStyle = {
  height: "90vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginLeft: "30%",
};

const goBackButtonStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  marginTop: "20px",
};

export const PagesRoutes = () => <GenericRoutes type="page" />;
export const HeaderRoutes = () => <GenericRoutes type="header" />;
export const FooterRoutes = () => <GenericRoutes type="footer" />;
export const AsideRoutes = () => <GenericRoutes type="aside" />;
