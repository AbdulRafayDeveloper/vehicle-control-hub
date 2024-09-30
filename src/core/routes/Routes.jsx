import lazy from "../../views/components/LazyLoadWithRetry/LazyLoadWithRetry.jsx";
import ContainerForm from "../../views/pages/Containers/ContainerForm.jsx";
import CustomerForm from "../../views/pages/Customer/CustomerForm.jsx";
import ItemForm from "../../views/pages/Inventory/ItemForm.jsx";
import SparePartForm from "../../views/pages/SpareParts/SparePartForm.jsx";
import VehicleForm from "../../views/pages/Vehicle/VehicleForm.jsx";
const Home = lazy(() => import("../../views/pages/Home/Home"));
const LoginForm = lazy(() => import("../../views/pages/Auth/Login"));
const ForgotPassword = lazy(() =>
  import("../../views/pages/Auth/ForgetPassword")
);

const ResetPassword = lazy(() => import("../../views/pages/Auth/RestPassword"));
const RegisterForm = lazy(() => import("../../views/pages/Auth/Register.jsx"));
const Auctions = lazy(() =>
  import("../../views/pages/Auctions/LiveAuctions.jsx")
);
const AuctionItems = lazy(() =>
  import("../../views/pages/Auctions/AuctionItems.jsx")
);
const SparePartListing = lazy(() =>
  import("../../views/pages/SpareParts/SparePartListing.jsx")
);
const VehicleListing = lazy(() =>
  import("../../views/pages/Vehicle/VehicleListing.jsx")
);
const Customer = lazy(() =>
  import("../../views/pages/Customer/CustomerPortal.jsx")
);
const Employee = lazy(() =>
  import("../../views/pages/Employee/EmployeePortal.jsx")
);
const UploadDocument = lazy(() =>
  import("../../views/pages/BLDocuments/UploadDocument.jsx")
);
const Container = lazy(() =>
  import("../../views/pages/Containers/ContainerListing.jsx")
);
const SalePurchase = lazy(() =>
  import("../../views/pages/SalePurchase/SalePurchase.jsx")
);
const Inventory = lazy(() =>
  import("../../views/pages/Inventory/Inventory.jsx")
);
const Item = lazy(() => import("../../views/pages/Inventory/Item.jsx"));
const Blog = lazy(() => import("../../views/pages/Blog/Blog.jsx"));
import Details from "../../views/pages/Admin/CarDetails.jsx";
import UpdateDetails from "../../views/pages/Admin/UpdateDetails.jsx";
export const routes = [
  // All protected routes
  {
    path: "/home",
    isProtected: true,
    page: <Home />,
    aside: null,
    // header: null,
    // footer: null,
  },

  // All public routes
  {
    path: "/admin/car-details",
    page: <Details />,
    isProtected: true,
    aside: null,
  },
  {
    path: "/admin/car-details/update-details",
    page: <UpdateDetails />,
    isProtected: true,
    aside: null,
  },
  {
    path: "/auctions",
    page: <Auctions />,
    isProtected: true,
    aside: null,
  },

  {
    path: "/auctions/:category/:id",
    page: <AuctionItems />,
    isProtected: true,
    aside: null,
  },
  {
    path: "/spare-part-listing",
    page: <SparePartListing />,
    isProtected: true,
    aside: null,
  },
  {
    path: "/add-spare-part-listing",
    page: <SparePartForm edit={false} />,
    isProtected: true,
    aside: null,
  },
  {
    path: "/edit-spare-part-listing/:id",
    page: <SparePartForm edit={true} />,
    isProtected: true,
    aside: null,
  },
  {
    path: "/vehicle-listing",
    page: <VehicleListing />,
    isProtected: true,
    aside: null,
  },
  {
    path: "/add-vehicle-listing",
    page: <VehicleForm edit={false} />,
    isProtected: true,
    aside: null,
  },
  {
    path: "/edit-vehicle-listing/:id",
    page: <VehicleForm edit={true} />,
    isProtected: true,
    aside: null,
  },
  {
    path: "/customers",
    page: <Customer />,
    isProtected: true,
    aside: null,
  },
  {
    path: "/add-customer",
    page: <CustomerForm edit={false} />,
    isProtected: true,
    aside: null,
  },
  {
    path: "/edit-customer/:id",
    page: <CustomerForm edit={true} />,
    isProtected: true,
    aside: null,
  },
  {
    path: "/employee",
    page: <Employee />,
    isProtected: true,
    aside: null,
  },

  {
    path: "/bl-documents",
    isProtected: true,
    page: <UploadDocument />,
    aside: null,
  },

  {
    path: "/containers",
    isProtected: true,
    page: <Container />,
    aside: null,
  },
  {
    path: "/add-container",
    page: <ContainerForm edit={false} />,
    isProtected: true,
    aside: null,
  },
  {
    path: "/edit-container/:id",
    page: <ContainerForm edit={true} />,
    isProtected: true,
    aside: null,
  },

  {
    path: "/sale-purchase",
    isProtected: true,
    page: <SalePurchase />,
    aside: null,
  },
  {
    path: "/inventory",
    isProtected: true,
    page: <Inventory />,
    aside: null,
  },

  {
    path: "/item",
    isProtected: true,
    page: <Item />,
    aside: null,
  },
  {
    path: "/edit-item/:id",
    page: <ItemForm edit={true} />,
    isProtected: true,
    aside: null,
  },
  {
    path: "/add-item",
    page: <ItemForm edit={false} />,
    isProtected: true,
    aside: null,
  },

  {
    path: "/blog",
    isProtected: true,
    page: <Blog />,
    aside: null,
  },
  /* auth routes */
  {
    path: "/login",
    page: <LoginForm />,
    isAuthRoute: true,
    // header: null,
    // footer: null,
    aside: null,
  },
  {
    path: "/register",
    isAuthRoute: true,
    page: <RegisterForm />,
    // header: null,
    // footer: null,
    aside: null,
  },
  {
    path: "/forgot_password",
    isAuthRoute: true,
    page: <ForgotPassword />,
    header: null,
    footer: null,
    aside: null,
  },

  {
    path: "/reset-password",
    isAuthRoute: true,
    page: <ResetPassword />,
    header: null,
    footer: null,
    aside: null,
  },
];
