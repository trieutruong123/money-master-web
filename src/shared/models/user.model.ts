import { colorScheme } from "utils";
export class UserInfo {
  email: string = "";
  firstName?: string = "";
  lastName?: string = "";
  displayName?: string = "";
  profileImage?: string = "";
  birthday?: Date = undefined;
  gender?: string = undefined;
  backgroundColor?: string = "";
  constructor(newUser?: UserInfo) {
    this.email = newUser?.email || "";
    this.firstName = newUser?.firstName || "";
    this.lastName = newUser?.lastName || "";
    this.profileImage = newUser?.profileImage || "";
    this.birthday = newUser?.birthday;
    this.gender = newUser?.gender;
  }
}
