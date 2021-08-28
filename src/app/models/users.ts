import { Groups } from "./groups";

export interface Users {
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
