export interface UserModel {
  [index: string]: string | number | undefined;

  id: string;
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  role: string;
}
