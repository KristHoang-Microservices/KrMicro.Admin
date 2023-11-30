import "./App.css";
import { AppRoute } from "./routes/AppRoute/AppRoute.tsx";
import { ReactElement, useEffect } from "react";
import { useAppDispatch } from "./app/hooks.ts";
import { localStorageService } from "./services";
import { setAccessToken } from "./features/identity/identity.slice.ts";
import { localStorageKey } from "./constants";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const queryClient = new QueryClient();

function App(): ReactElement {
  const dispatch = useAppDispatch();
  moment.locale("vn");

  useEffect(() => {
    const accessToken: string | null = localStorageService.get(
      localStorageKey.ACCESS_TOKEN,
    );

    if (accessToken === null) return;

    dispatch(setAccessToken(accessToken));
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <LocalizationProvider
          dateAdapter={AdapterMoment}
          dateLibInstance={moment}
        >
          <AppRoute />
          <Toaster />
        </LocalizationProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default App;
