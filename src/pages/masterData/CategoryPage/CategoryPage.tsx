import { Key, ReactElement, useCallback, useState } from "react";
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { categoryTableColumns } from "./constants";
import {
  useGetCategory,
  useGetCategoryDetail,
  useUpdateCategoryStatus,
} from "./hooks";
import { User } from "@nextui-org/user";
import { Category } from "../../../api/masterData/models";
import moment from "moment";
import { getStatusName } from "../../../utils/getStatusName.ts";
import { getStatusColor } from "../../../utils/getStatusColor.ts";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlinePencil,
  HiOutlineTrash,
  HiPlus,
} from "react-icons/hi";
import { CategoryFormModal } from "./components/CategoryFormModal";
import { GetDetailCategoryRequest } from "../../../api/masterData/requests/category";
import { ConfirmForm } from "../../../components/ConfirmForm";
import { Status } from "../../../models/status.enum.ts";
import { toast } from "react-hot-toast";

export function CategoryPage(): ReactElement {
  const { data: categories, isLoading: loadingList } = useGetCategory();

  const [detailRequest, setDetailRequest] =
    useState<GetDetailCategoryRequest | null>(null);

  const { data: detail } = useGetCategoryDetail({ request: detailRequest });

  const { mutateAsync: updateStatusAsync, isLoading: updatingStatus } =
    useUpdateCategoryStatus();

  const { isOpen: CUFormIsOpen, onOpenChange: CUFormOnOpenChange } =
    useDisclosure();
  const {
    isOpen: ConfirmDelFormIsOpen,
    onOpenChange: ConfirmDelFormOnOpenChange,
  } = useDisclosure();
  const {
    isOpen: ConfirmVisibleFormIsOpen,
    onOpenChange: ConfirmVisibleFormOnOpenChange,
  } = useDisclosure();

  const renderCell = useCallback(
    (category: Category, columnKey: number) => {
      const cellValue = category[categoryTableColumns[columnKey].name];
      switch (categoryTableColumns[columnKey].name) {
        case "category":
          return (
            <User
              avatarProps={{ radius: "lg", src: category.imageUrl }}
              name={category.name}
            />
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              size="sm"
              variant="flat"
              color={getStatusColor(category.status)}
            >
              {getStatusName(category.status)}
            </Chip>
          );
        case "createdAt":
          return <p>{moment(cellValue as string).format("DD/MM/YYYY")}</p>;
        case "updatedAt":
          return (
            <p>
              {cellValue !== null
                ? moment(cellValue as string).format("DD/MM/YYYY")
                : ""}
            </p>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color={"primary"} content="Sửa">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => {
                    setDetailRequest({ id: category.id });
                    CUFormOnOpenChange();
                  }}
                >
                  <HiOutlinePencil />
                </span>
              </Tooltip>
              <Tooltip
                color={
                  category.status === Status.Available ? "primary" : "danger"
                }
                content="Hiển thị"
              >
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => {
                    setDetailRequest({ id: category.id });
                    ConfirmVisibleFormOnOpenChange();
                  }}
                >
                  {category.status === Status.Available ? (
                    <HiOutlineEye />
                  ) : (
                    <HiOutlineEyeOff />
                  )}
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Xóa">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => {
                    setDetailRequest({ id: category.id });
                    ConfirmDelFormOnOpenChange();
                  }}
                >
                  <HiOutlineTrash />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return <p>{cellValue as string}</p>;
      }
    },
    [
      CUFormOnOpenChange,
      ConfirmDelFormOnOpenChange,
      ConfirmVisibleFormOnOpenChange,
    ],
  );

  const onSubmitConfirmVisible = async () => {
    if (detail?.data === null) return;
    const res = await updateStatusAsync({
      request: {
        id: detail?.data.id ?? -1,
        status:
          detail?.data.status === Status.Available
            ? Status.Disable
            : Status.Available,
      },
    });

    if (res === null) {
      toast.error("Có lỗi không rỏ!");
    } else {
      ConfirmVisibleFormOnOpenChange();
    }
  };
  const onSubmitConfirmDelete = async () => {
    if (detail?.data === null) return;
    const res = await updateStatusAsync({
      request: {
        id: detail?.data.id ?? -1,
        status: Status.Delete,
      },
    });

    if (res === null) {
      toast.error("Có lỗi không rỏ!");
    } else {
      ConfirmDelFormOnOpenChange();
    }
  };

  return (
    <div>
      <div className={"flex justify-between mb-3"}>
        <p className={"font-semibold mb-4"}>Danh sách phân loại</p>
        <Button
          variant="solid"
          color={"primary"}
          startContent={<HiPlus />}
          onClick={() => CUFormOnOpenChange()}
        >
          Thêm
        </Button>
      </div>
      <div>
        <Table aria-label="Example table with custom cells" fullWidth={true}>
          <TableHeader>
            {categoryTableColumns.map((column) => (
              <TableColumn
                key={column.id}
                align={column.name === "actions" ? "center" : "start"}
              >
                {column.display}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody
            emptyContent={"Hỏng có gì để xem "}
            items={categories?.listData ?? []}
            isLoading={loadingList}
          >
            {(item: Category) => (
              <TableRow key={item.id}>
                {(col: Key) => (
                  <TableCell>{renderCell(item, col as number)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CategoryFormModal
        isOpen={CUFormIsOpen}
        onClose={() => {
          CUFormOnOpenChange();
          setDetailRequest(null);
        }}
        isUpdating={detailRequest !== null}
        onOpenChange={CUFormOnOpenChange}
        data={detailRequest !== null ? detail?.data : undefined}
      />

      <ConfirmForm
        name={"Xóa phân loại"}
        message={"Xác nhận xóa phân loại này " + detail?.data.name + " ?"}
        isOpen={ConfirmDelFormIsOpen}
        onClose={() => {
          ConfirmDelFormOnOpenChange();
          setDetailRequest(null);
        }}
        onOpenChange={ConfirmDelFormOnOpenChange}
        onSubmit={onSubmitConfirmDelete}
        isLoading={updatingStatus}
      />

      <ConfirmForm
        name={"Đổi trạng thái hiển thị phân loại"}
        message={`Xác nhận ${
          detail?.data.status === Status.Available ? "ẩn" : "hiện"
        } phân loại này ${detail?.data.name} ?`}
        isOpen={ConfirmVisibleFormIsOpen}
        onClose={() => {
          ConfirmVisibleFormOnOpenChange();
          setDetailRequest(null);
        }}
        onOpenChange={ConfirmVisibleFormOnOpenChange}
        onSubmit={onSubmitConfirmVisible}
        isLoading={updatingStatus}
      />
    </div>
  );
}
