import { CUForm } from "../../../../../components/CUForm";
import { useForm } from "react-hook-form";
import { useCreateUser, useUpdateUser } from "../../hooks/";
import { useEffect } from "react";
import { CreateUserRequest } from "../../../../../api/identity/requests/account";
import { GetUsersResponse } from "../../../../../api/identity/responses/account/getUsersResponse.ts";
import {
  GetUserRoleValue,
  UserRole,
  UserRoleArray,
} from "../../../../../api/identity/models/enums/UserRole.enum.ts";
import { Input, Select, SelectItem } from "@nextui-org/react";

interface UserFormProps {
  data?: GetUsersResponse;
  isOpen: boolean;
  onClose: () => void;
  isUpdating: boolean;
  onOpenChange: (isOpen?: boolean) => void;
}

export function UserFormModal({
  data,
  isOpen,
  onClose,
  onOpenChange,
  isUpdating,
}: UserFormProps) {
  const { reset, setValue, handleSubmit, register } =
    useForm<CreateUserRequest>();
  const { mutateAsync: createAsync, isLoading: createLoading } =
    useCreateUser();
  const { mutateAsync: updateAsync, isLoading: updateLoading } =
    useUpdateUser();

  useEffect(() => {
    reset({
      ...data?.user,
      role: GetUserRoleValue(data?.role ?? ""),
      password: undefined,
    });
  }, [data, reset]);

  const onSubmit = async (dataSubmit: CreateUserRequest) => {
    let res;
    if (!isUpdating) res = await createAsync(dataSubmit);
    else if (data?.user.id !== undefined)
      res = await updateAsync({ ...dataSubmit, id: data.user.id });
    if (res !== null) {
      onClose();
    }
  };

  const closeEndReset = () => {
    onClose();
    onClear();
  };

  const onClear = () => {
    reset({
      userName: "",
      fullName: "",
      password: "",
      email: "",
    });
  };

  return (
    <CUForm<CreateUserRequest>
      name={<p>Thông tin người dùng </p>}
      isOpen={isOpen}
      isUpdating={isUpdating}
      onClose={closeEndReset}
      onOpenChange={onOpenChange}
      isLoading={createLoading || updateLoading}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
    >
      <div className={"grid grid-cols-2 gap-2"}>
        <Input
          {...register("fullName")}
          defaultValue={data?.user.fullName}
          placeholder={"Họ và tên"}
          label={"Họ và tên"}
        />
        <Input
          {...register("phoneNumber")}
          defaultValue={data?.user.phoneNumber}
          placeholder={"Số điện thoại"}
          label={"Số điện thoại"}
        />
        <Input
          className={"col-span-1"}
          {...register("email")}
          defaultValue={data?.user.email}
          placeholder={"Email"}
          label={"Email"}
        />
        <Select
          label={"Vai trò"}
          items={UserRoleArray}
          isDisabled={isUpdating}
          defaultSelectedKeys={[data?.role ?? "Khách hàng"]}
          onChange={(value) => {
            if (value.target.value === "") {
              setValue("role", undefined);
              return;
            }
            setValue("role", GetUserRoleValue(value.target.value));
          }}
        >
          {UserRoleArray.map((item: string, index) => (
            <SelectItem
              key={UserRole[index]}
              value={UserRole[index]}
              textValue={item}
            >
              {item}
            </SelectItem>
          ))}
        </Select>
        <Input
          {...register("userName")}
          label={"Tài khoản"}
          defaultValue={data?.user.userName}
          placeholder={"Tài khoản"}
        />
        <Input
          isDisabled={isUpdating}
          type={"password"}
          {...register("password")}
          label={"Mật khẩu đăng nhập"}
          placeholder={"Mật khẩu"}
        />
      </div>
    </CUForm>
  );
}
