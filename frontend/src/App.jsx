import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/user/userSlice";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";

// ── Public Pages ────────────────────────────────────────────────
const Home = lazy(() => import("./pages/Home"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Products = lazy(() => import("./pages/Products"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

// ── Auth ────────────────────────────────────────────────────────
const Register = lazy(() => import("./User/Register"));
const Login = lazy(() => import("./User/Login"));
const ForgotPassword = lazy(() => import("./User/ForgotPassword"));
const ResetPassword = lazy(() => import("./User/ResetPassword"));

// ── User Protected ──────────────────────────────────────────────
const UserDashboard = lazy(() => import("./User/UserDashboard"));
const Profile = lazy(() => import("./User/Profile"));
const UpdateProfile = lazy(() => import("./User/UpdateProfile"));
const UpdatePassword = lazy(() => import("./User/UpdatePassword"));

// ── Cart & Checkout ─────────────────────────────────────────────
const Cart = lazy(() => import("./Cart/Cart"));
const Shipping = lazy(() => import("./Cart/Shipping"));
const OrderConfirm = lazy(() => import("./Cart/OrderConfirm"));
const Payment = lazy(() => import("./Cart/Payment"));
const PaymentSuccess = lazy(() => import("./Cart/PaymentSuccess"));

// ── Orders ──────────────────────────────────────────────────────
const MyOrders = lazy(() => import("./Orders/MyOrders"));
const OrderDetails = lazy(() => import("./Orders/OrderDetails"));

// ── Admin ───────────────────────────────────────────────────────
const Dashboard = lazy(() => import("./Admin/Dashboard"));
const ProductsList = lazy(() => import("./Admin/ProductsList"));
const CreateProduct = lazy(() => import("./Admin/CreateProduct"));
const UpdateProduct = lazy(() => import("./Admin/UpdateProduct"));
const UsersList = lazy(() => import("./Admin/UsersList"));
const UpdateRole = lazy(() => import("./Admin/UpdateRole"));
const OrdersList = lazy(() => import("./Admin/OrdersList"));
const UpdateOrder = lazy(() => import("./Admin/UpdateOrder"));
const ReviewsList = lazy(() => import("./Admin/ReviewsList"));

function App() {
  const dispatch = useDispatch();

  // Always verify session on app mount — server is the source of truth
  // (previously only ran if isAuthenticated from localStorage was true)
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* User Protected */}
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="/profile/update"
            element={<ProtectedRoute element={<UpdateProfile />} />}
          />
          <Route
            path="/password/update"
            element={<ProtectedRoute element={<UpdatePassword />} />}
          />
          <Route
            path="/shipping"
            element={<ProtectedRoute element={<Shipping />} />}
          />
          <Route
            path="/order/confirm"
            element={<ProtectedRoute element={<OrderConfirm />} />}
          />
          <Route
            path="/payment/process"
            element={<ProtectedRoute element={<Payment />} />}
          />
          <Route
            path="/paymentSuccess"
            element={<ProtectedRoute element={<PaymentSuccess />} />}
          />
          <Route
            path="/orders/user"
            element={<ProtectedRoute element={<MyOrders />} />}
          />
          <Route
            path="/order/:orderId"
            element={<ProtectedRoute element={<OrderDetails />} />}
          />

          {/* Admin Only */}
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute element={<Dashboard />} adminOnly />}
          />
          <Route
            path="/admin/products"
            element={<ProtectedRoute element={<ProductsList />} adminOnly />}
          />
          <Route
            path="/admin/product/create"
            element={<ProtectedRoute element={<CreateProduct />} adminOnly />}
          />
          <Route
            path="/admin/product/:id"
            element={<ProtectedRoute element={<UpdateProduct />} adminOnly />}
          />
          <Route
            path="/admin/users"
            element={<ProtectedRoute element={<UsersList />} adminOnly />}
          />
          <Route
            path="/admin/user/:userId"
            element={<ProtectedRoute element={<UpdateRole />} adminOnly />}
          />
          <Route
            path="/admin/orders"
            element={<ProtectedRoute element={<OrdersList />} adminOnly />}
          />
          <Route
            path="/admin/order/:orderId"
            element={<ProtectedRoute element={<UpdateOrder />} adminOnly />}
          />
          <Route
            path="/admin/reviews"
            element={<ProtectedRoute element={<ReviewsList />} adminOnly />}
          />
        </Routes>

        {/* UserDashboard is a sidebar/overlay — rendered outside Routes */}
        <UserDashboardWrapper />
      </Suspense>
    </Router>
  );
}

// Separate component so useSelector works (React hooks require component scope)
function UserDashboardWrapper() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  if (!isAuthenticated) return null;
  return <UserDashboard user={user} />;
}

export default App;
