export enum UserRole {
  Admin,
  Employee,
  Customer,
}

export const UserRoleArray = ["Admin", "Nhân viên", "Khách hàng"];

export const GetUserRoleValue = (name: string): UserRole => {
  switch (name) {
    case "Admin":
      return UserRole.Admin;
    case "Employee":
      return UserRole.Employee;
    case "Customer":
      return UserRole.Customer;
    default:
      return UserRole.Customer;
  }
};
