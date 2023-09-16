export enum RouteName {
  //  main pages
  Home = "/",
  Login = "/login",
  Register = "/register",
  Services = "/services",
  Aboutus = "/aboutus",
  Contactus = "/contactus",
  ProviderDetails = "/providerdetails/:providerId",

  //logged user
  MyEvents = "/myevents/:userId",
  Profile = "/profile/:userId",
  EventDetails = "/eventdetails/:eventId",

  // provider
  MyServices = "/myservices/:userId",
  // ProviderReviews = "/providereviews/:providerId",
  AddNewService = "/addnewservice/:userId",
  ServiceDetails = "/servicedetails/:providerId",

  //admin
  AdminDashboard = "/admindashboard/:id",
}
