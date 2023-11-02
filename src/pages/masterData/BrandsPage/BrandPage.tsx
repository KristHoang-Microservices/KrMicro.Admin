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
import { brandTableColumns } from "./constants";
import { useGetBrand, useGetBrandDetail, useUpdateBrandStatus } from "./hooks";
import { User } from "@nextui-org/user";
import { Brand } from "../../../api/masterData/models";
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
import { BrandFormModal } from "./components/BrandFormModal";
import { GetDetailBrandRequest } from "../../../api/masterData/requests/brand";
import { ConfirmForm } from "../../../components/ConfirmForm";
import { Status } from "../../../models/status.enum.ts";
import { toast } from "react-hot-toast";

export function BrandPage(): ReactElement {
  const { data: brands, isLoading: loadingList } = useGetBrand();

  const [detailRequest, setDetailRequest] =
    useState<GetDetailBrandRequest | null>(null);

  const { data: detail } = useGetBrandDetail({ request: detailRequest });

  const { mutateAsync: updateStatusAsync, isLoading: updatingStatus } =
    useUpdateBrandStatus();

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
    (brand: Brand, columnKey: number) => {
      const cellValue = brand[brandTableColumns[columnKey].name];
      switch (brandTableColumns[columnKey].name) {
        case "brand":
          return (
            <User
              avatarProps={{ radius: "lg", src: brand.imageUrl }}
              name={brand.name}
            />
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              size="sm"
              variant="flat"
              color={getStatusColor(brand.status)}
            >
              {getStatusName(brand.status)}
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
                    setDetailRequest({ id: brand.id });
                    CUFormOnOpenChange();
                  }}
                >
                  <HiOutlinePencil />
                </span>
              </Tooltip>
              <Tooltip
                color={brand.status === Status.Available ? "primary" : "danger"}
                content="Hiển thị"
              >
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => {
                    setDetailRequest({ id: brand.id });
                    ConfirmVisibleFormOnOpenChange();
                  }}
                >
                  {brand.status === Status.Available ? (
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
                    setDetailRequest({ id: brand.id });
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
        <p className={"font-semibold mb-4"}>Danh sách nhãn hiệu</p>
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
            {brandTableColumns.map((column) => (
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
            items={brands?.listData ?? []}
            isLoading={loadingList}
          >
            {(item: Brand) => (
              <TableRow key={item.id}>
                {(col: Key) => (
                  <TableCell>{renderCell(item, col as number)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <BrandFormModal
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
