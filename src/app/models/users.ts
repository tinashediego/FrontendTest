import { Groups } from "./groups";

export interface Users {
  [x: string]: any;
  id:string;
  email: String;
  username: String;
  firstName: String;
  lastName: String;
  initials: String;
  ownerId: String;
  phoneNumber: String;
  portalClient:"ADMIN_PORTAL_USER";
  groupId: Groups;
}
