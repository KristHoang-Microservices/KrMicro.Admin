import { ReactElement, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { LoginRequest } from "../../../api/identity/requests/LoginRequest.ts";
import { identityApi } from "../../../api/identity/identity.api.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";

import {
  selectIsAuthenticated,
  setAccessToken,
} from "../../../features/identity/identity.slice.ts";
import { toast } from "react-hot-toast";

export function AuthPage(): ReactElement {
  const { register, handleSubmit } = useForm<LoginRequest>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginFn = async (data: LoginRequest) => {
    async function loginAsync() {
      const response = await identityApi.login(data);
      if (response === null) return;

      if (response?.accessToken !== null) {
        dispatch(setAccessToken(response?.accessToken));
        navigate("/dashboard");
      }
    }

    await toast.promise(loginAsync(), {
      success: "Thành công rồi nè",
      error: "Đăng nhập thất bại 😒",
      loading: "Đang kiểm tra nè 🔍",
    });
  };

  const { pathname } = useLocation();
  const isAuthenticated: boolean = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, pathname]);

  return (
    <div
      className={
        "h-screen w-screen bg-[#3c3c3c] bg-center relative bg-no-repeat bg-cover overflow-hidden"
      }
    >
      <div
        className={
          "h-[90%] w-[30%] p-6 absolute right-[64px] top-[42px]  text-black rounded-xl shadow flex items-center justify-center flex-col bg-white"
        }
      >
        <p className={"text-center font-semibold text-xl mb-4"}>Đăng nhập</p>
        <div className={"relative w-full"}>
          <form
            onSubmit={handleSubmit(loginFn)}
            className={"flex flex-col items-center"}
          >
            <Input
              label={"Tài khoản"}
              className={"p-2"}
              {...register("username")}
            />
            <Input
              label={"Mật khẩu"}
              className={"p-2"}
              {...register("password")}
              type={"password"}
            />

            <Button className={"mt-3"} type={"submit"}>
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
