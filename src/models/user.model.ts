export class UserInfo {
  email: string = '';
  firstName?: string = '';
  lastName?: string = '';
  displayName?: string = '';
  profileImage?: string = '';

  constructor(newUser: UserInfo) {
    this.email = newUser.email;
    this.firstName = newUser?.firstName || '';
    this.lastName = newUser?.lastName || '';
    this.displayName = newUser?.displayName || '';
    this.profileImage = newUser.profileImage || '';
  }
}
