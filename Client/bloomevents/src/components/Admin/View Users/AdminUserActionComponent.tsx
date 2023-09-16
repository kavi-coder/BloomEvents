import { Box } from "@mui/material";
import LoginDetailsServices from "Services/Login Details/LoginDetailsServices";
import { useEffect, useState } from "react";

function AdminUserActionComponent({ params }: any) {
  // get email
  const [email, setEmail] = useState<any>();
  useEffect(() => {
    const { userId } = params.row;
    LoginDetailsServices.getEmailByUserId(userId).then((res: any) => {
      if (res.data.status === 1) {
        setEmail(res.data.data);
      }
    });
  }, []);

  return (
    <div>
      <Box
        sx={{
          m: 1,
          position: "relative",
        }}>
        {email && email}
      </Box>
    </div>
  );
}

export default AdminUserActionComponent;
