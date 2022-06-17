import { rootStore } from "./root.store";
import { runInAction } from "mobx";
import { httpService } from "./../../services/http-service";
import { validateFirstLastName } from "./../../utils/regex";
import { action, makeAutoObservable, observable } from "mobx";
import { UserInfo } from "shared/models";
import { getRandomAvatarColor } from "utils";
import { content } from "i18n";

class UserStore {
  user: UserInfo | undefined = undefined;
  constructor() {
    makeAutoObservable(this, {
      user: observable,

      setUserInfo: action,

      updateUserInfo: action,
      updateUserAvatar: action,
    });
  }

  setUserInfo(userInfo: UserInfo) {
    this.user = userInfo;
    console.log(userInfo);
    if (userInfo.profileImage) {
      this.user.backgroundColor = getRandomAvatarColor();
    }
  }

  async updateUserInfo(newUser: {
    email: string;
    firstName: string;
    lastName: string;
    gender?: string | null;
    birthday?: Date | null;
  }) {
    if (this.user === undefined) {
      return;
    }
    const url = "/user";
    const res: { isError: boolean; data: any } = await httpService.put(
      url,
      newUser
    );
    if (!res.isError) {
      runInAction(() => {
        this.user = res.data;
      });
    } else {
    }
    return res;
  }

  async updateUserAvatar(image: any) {
    if (this.user === undefined) {
      return;
    }

    const url = "/user/avatar";
    const res: { isError: boolean; data: any } = await httpService.put(
      url,
      image
    );
    if (!res.isError) {
      runInAction(() => {
        if (this.user === undefined) {
          return;
        }
        this.user.profileImage = res.data.profileImage;
      });
    } else {
    }
    return res;
  }

  async updatePassword(payload: { newPassword: string; oldPassword: string }) {
    if (this.user === undefined) {
      return;
    }
    const url = "/account/password";
    const res: { isError: boolean; data: any } = await httpService.put(
      url,
      payload
    );
    if (!res.isError) {
      rootStore.raiseNotification(
        content[rootStore.locale].success.updatePassword,
        "success"
      );
      return res;
    } else {
      return res;
    }
  }

  deleteUser() {
    this.user = undefined;
  }
}

export const userStore = new UserStore();
