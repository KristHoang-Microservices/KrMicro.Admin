import {
  Key,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { userTableColumns } from "./constants";
import { useGetUserDetail, useGetUsers } from "./hooks";
import { HiOutlineEye, HiOutlineTrash, HiPlus, HiSearch } from "react-icons/hi";
// import { UserFormModal } from "./components/UserFormModal";
import {
  GetAllUsersRequest,
  GetDetailUserRequest,
} from "../../../api/identity/requests/account";
import { User } from "@nextui-org/user";
import {
  GetUserRoleValue,
  UserRole,
  UserRoleArray,
} from "../../../api/identity/models/enums/UserRole.enum.ts";
import { GetUsersResponse } from "../../../api/identity/responses/account/getUsersResponse.ts";
import { debounce } from "@mui/material";
import { UserFormModal } from "./components/UserFormModal";
import { toast } from "react-hot-toast";
import { useDeleteUser } from "./hooks/useDeleteUser.tsx";
import { ConfirmForm } from "../../../components/ConfirmForm";

export function UsersPage(): ReactElement {
  const [usersRequest, setUserRequest] = useState<
    GetAllUsersRequest | undefined
  >();

  const { data: users, isLoading: loadingList } = useGetUsers(usersRequest);

  const [detailRequest, setDetailRequest] = useState<
    GetDetailUserRequest | undefined
  >();

  const { data: detail } = useGetUserDetail({ request: detailRequest });

  const { mutateAsync: deleteAsync, isLoading: deletingStatus } =
    useDeleteUser();

  const { isOpen: CUFormIsOpen, onOpenChange: CUFormOnOpenChange } =
    useDisclosure();

  const {
    isOpen: ConfirmDelFormIsOpen,
    onOpenChange: ConfirmCancelFormOnOpenChange,
  } = useDisclosure();

  const [pageList, setPageList] = useState<{
    listData: GetUsersResponse[];
  }>();

  useEffect(() => {
    if (users !== undefined) {
      setPageList(users);
    }
  }, [users]);

  const renderCell = useCallback(
    (user: GetUsersResponse, columnKey: number) => {
      const cellValue = user.user[userTableColumns[columnKey].name];
      switch (userTableColumns[columnKey].name) {
        case "user":
          return (
            <User
              name={user.user.fullName}
              description={user.user.userName}
            ></User>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color={"primary"} content="Xem chi tiết">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => {
                    setDetailRequest({ id: user.user.id });
                    CUFormOnOpenChange();
                  }}
                >
                  <HiOutlineEye />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Xóa">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => {
                    setDetailRequest({ id: user.user.id });
                    ConfirmCancelFormOnOpenChange();
                  }}
                >
                  <HiOutlineTrash />
                </span>
              </Tooltip>
            </div>
          );
        case "role":
          return <p>{UserRoleArray[GetUserRoleValue(user.role).valueOf()]}</p>;
        default:
          return <p>{cellValue as string}</p>;
      }
    },
    [CUFormOnOpenChange, ConfirmCancelFormOnOpenChange],
  );

  // Search element

  const [searchFilter, setSearchFilter] = useState<string | undefined>();
  const onSearchChange = debounce((value?: string) => {
    setSearchFilter(value);
    if (value !== undefined && value !== "")
      setPageList(() => ({
        ...users,
        listData:
          users?.listData.filter(
            (item) =>
              item.user.userName?.includes(value) ||
              item.user.fullName?.includes(value) ||
              (item.user.phoneNumber !== undefined &&
                item.user.phoneNumber?.includes(value)),
          ) ?? [],
      }));
    else {
      setPageList(users);
      setSearchFilter("");
    }
  }, 300);

  const searchEngine = useMemo(() => {
    return (
      <div className={"flex flex-col gap-4"}>
        <div className={"flex gap-4"}>
          <Input
            isClearable
            className="w-full"
            placeholder="Tìm theo tên, tài khoản, số điện thoại..."
            startContent={<HiSearch />}
            value={searchFilter}
            onClear={() => onSearchChange(undefined)}
            onValueChange={(value) => onSearchChange(value)}
            size={"sm"}
          />
          <Select
            label={"Vai trò"}
            size={"sm"}
            selectionMode={"multiple"}
            items={UserRoleArray}
            onChange={(value) => {
              if (value.target.value === "") {
                setUserRequest((prev) => ({ ...prev, role: undefined }));
                return;
              }
              setUserRequest((prev) => ({
                ...prev,
                role: value.target.value.split(","),
              }));
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
        </div>
      </div>
    );
  }, [onSearchChange, searchFilter]);

  const onSubmitConfirmDelete = async () => {
    if (detailRequest === undefined) return;
    const res = await deleteAsync({
      id: detailRequest?.id,
    });

    if (res === null) {
      toast.error("Có lỗi không rỏ!");
    } else {
      ConfirmCancelFormOnOpenChange();
    }
  };

  return (
    <div>
      <div className={"flex justify-between mb-3"}>
        <p className={"font-semibold mb-4"}>Danh sách tất cả người dùng</p>
        <Button
          variant="solid"
          color={"primary"}
          startContent={<HiPlus />}
          onClick={() => {
            setDetailRequest(undefined);
            CUFormOnOpenChange();
          }}
        >
          Thêm
        </Button>
      </div>
      <div>
        <Table
          aria-label="Example table with custom cells"
          fullWidth={true}
          topContent={searchEngine}
        >
          <TableHeader>
            {userTableColumns.map((column) => (
              <TableColumn
                key={column.id}
                align={["actions"].includes(column.name) ? "center" : "start"}
              >
                {column.display}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody items={pageList?.listData ?? []} isLoading={loadingList}>
            {(item: GetUsersResponse) => (
              <TableRow key={`Row${item.user.id}`}>
                {(col: Key) => (
                  <TableCell>{renderCell(item, col as number)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <UserFormModal
        isOpen={CUFormIsOpen}
        onClose={() => {
          CUFormOnOpenChange();
          setDetailRequest(undefined);
        }}
        isUpdating={detailRequest !== undefined}
        onOpenChange={CUFormOnOpenChange}
        data={detail?.data}
      />

      <ConfirmForm
        name={"Xóa người dùng"}
        message={
          "Xác nhận xóa phân loại này " + detail?.data.user.userName + " ?"
        }
        isOpen={ConfirmDelFormIsOpen}
        onClose={() => {
          ConfirmCancelFormOnOpenChange();
          setDetailRequest(undefined);
        }}
        onOpenChange={ConfirmCancelFormOnOpenChange}
        onSubmit={onSubmitConfirmDelete}
        isLoading={deletingStatus}
      />
    </div>
  );
}
