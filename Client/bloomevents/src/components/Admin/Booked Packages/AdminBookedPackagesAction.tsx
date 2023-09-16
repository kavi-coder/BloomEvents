import { Box } from "@mui/material";
import EventServices from "Services/Event/EventServices";
import PackageServices from "Services/Packages/PackageService";
import ProviderService from "Services/Provider/ProviderServices";
import UserServices from "Services/User/UserServices";
import { useEffect, useState } from "react";

function AdminBookedPackagesAction({ params, col }: any) {
  const [event, setEvent] = useState<any>();
  const { eventId } = params.row;
  useEffect(() => {
    EventServices.getEventById(eventId).then((res: any) => {
      if (res.data.status === 1) {
        setEvent(res.data.data);
      }
    });
  }, []);

  const [user, setUser] = useState<any>();
  useEffect(() => {
    if (event) {
      UserServices.getUserByUserId(event?.userId).then((res: any) => {
        if (res.data.status === 1) {
          setUser(res.data.data);
        }
      });
    }
  }, [event]);

  const [provider, setProvider] = useState<any>();
  useEffect(() => {
    const { packagesPackageId } = params.row;
    ProviderService.getProviderByPackageId(packagesPackageId).then(
      (res: any) => {
        if (res.data.status === 1) {
          setProvider(res.data.data);
        }
      }
    );
  }, []);

  const [pckage, setPackage] = useState<any>();
  useEffect(() => {
    const { packagesPackageId } = params.row;
    PackageServices.getPackageByPackageId(packagesPackageId).then(
      (res: any) => {
        if (res.data.status === 1) {
          setPackage(res.data.data);
        }
      }
    );
  }, []);

  return (
    <div>
      {event && col === "eventName" && (
        <Box
          sx={{
            m: 1,
            position: "relative",
          }}>
          {event.eventName}
        </Box>
      )}

      {event && col === "eventTime" && (
        <Box
          sx={{
            m: 1,
            position: "relative",
          }}>
          {event.eventTime}
        </Box>
      )}

      {event && col === "eventDate" && (
        <Box
          sx={{
            m: 1,
            position: "relative",
          }}>
          {event.eventDate}
        </Box>
      )}

      {event && col === "placedDate" && (
        <Box
          sx={{
            m: 1,
            position: "relative",
          }}>
          {event.placedDate}
        </Box>
      )}

      {event && col === "placedTime" && (
        <Box
          sx={{
            m: 1,
            position: "relative",
          }}>
          {event.placedTime}
        </Box>
      )}

      {user && col === "userId" && (
        <Box
          sx={{
            m: 1,
            position: "relative",
          }}>
          {user.userId}
        </Box>
      )}

      {user && col === "userName" && (
        <Box
          sx={{
            m: 1,
            position: "relative",
          }}>
          {user.firstName} {user.lastName}
        </Box>
      )}

      {provider && col === "businessName" && (
        <Box
          sx={{
            m: 1,
            position: "relative",
          }}>
          {provider.businessName}
        </Box>
      )}

      {pckage && col === "packageName" && (
        <Box
          sx={{
            m: 1,
            position: "relative",
          }}>
          {pckage.packageName}
        </Box>
      )}

      {pckage && col === "price" && (
        <Box
          sx={{
            m: 1,
            position: "relative",
          }}>
          {pckage.price}
        </Box>
      )}
    </div>
  );
}

export default AdminBookedPackagesAction;
