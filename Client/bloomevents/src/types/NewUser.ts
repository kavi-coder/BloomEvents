import { Role } from "Enums/Role";

export default interface NewUser {
  firstName: string;
  lastName: string;
  district: string;
  role: Role;
  mobile: string;
  email: string;
  password: string;
}
