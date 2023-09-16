import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import EventDetails from "components/User Events/EventDetails";
import UserProfile from "components/User Profile/UserProfile";
import { RouteName } from "constant/routeName";
import Aboutus from "pages/Aboutus";
import AdminDashboard from "pages/Admin/AdminDashboard";
import Contactus from "pages/Contactus";
import LandingPage from "pages/LandingPage";
import MyEvents from "pages/Logged User/MyEvents";
import Login from "pages/Login";
import AddNewServices from "pages/Provider Pages/AddNewServices";
import EditServiceDetail from "pages/Provider Pages/EditService/EditServiceDetail";
import MyServices from "pages/Provider Pages/MyServices";
import ServiceDetail from "pages/Provider Pages/ServiceDetail";
import ProviderDetails from "pages/ProviderDetails";
import Services from "pages/Services";
import Signup from "pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="min-h-[600px]">
          <Routes>
            {/* Nav bar */}
            <Route
              path={RouteName.Home}
              caseSensitive={false}
              element={<LandingPage />}
            />
            <Route
              path={RouteName.Login}
              caseSensitive={false}
              element={<Login />}
            />
            <Route
              path={RouteName.Register}
              caseSensitive={false}
              element={<Signup />}
            />
            <Route
              path={RouteName.Services}
              caseSensitive={false}
              element={<Services />}
            />
            <Route
              path={RouteName.Aboutus}
              caseSensitive={false}
              element={<Aboutus />}
            />
            <Route
              path={RouteName.Contactus}
              caseSensitive={false}
              element={<Contactus />}
            />

            {/* Service */}
            <Route
              path={RouteName.ProviderDetails}
              caseSensitive={false}
              element={<ProviderDetails />}
            />

            {/* Events */}
            <Route
              path={RouteName.MyEvents}
              caseSensitive={false}
              element={<MyEvents />}
            />
            <Route
              path={RouteName.EventDetails}
              caseSensitive={false}
              element={<EventDetails />}
            />

            {/* Profile */}
            <Route
              path={RouteName.Profile}
              caseSensitive={false}
              element={<UserProfile />}
            />

            {/* Provider */}
            <Route
              path={RouteName.MyServices}
              caseSensitive={false}
              element={<MyServices />}
            />

            <Route
              path={RouteName.AddNewService}
              caseSensitive={false}
              element={<AddNewServices />}
            />

            <Route
              path={RouteName.ServiceDetails}
              caseSensitive={false}
              element={<ServiceDetail />}
            />

            {/* Admin */}
            <Route
              path={RouteName.AdminDashboard}
              caseSensitive={false}
              element={<AdminDashboard />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Router;
