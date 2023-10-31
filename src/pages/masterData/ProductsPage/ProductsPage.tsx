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
import { productTableColumns } from "./constants/productTableColumns.ts";
import {
  useGetProduct,
  useGetProductDetail,
  useUpdateProductStatus,
} from "./hooks";
import { User } from "@nextui-org/user";
import { Product } from "../../../api/masterData/models";
import moment from "moment";
import { getStatusName } from "../../../utils/getStatusName.ts";
import { getStatusColor } from "../../../utils/getStatusColor.ts";
import { HiOutlinePencil, HiOutlineTrash, HiPlus } from "react-icons/hi";
import { ProductFormModal } from "./components/ProductFormModal";
import { GetDetailProductRequest } from "../../../api/masterData/requests/product";
import { ConfirmForm } from "../../../components/ConfirmForm";
import { Status } from "../../../models/status.enum.ts";
import { toast } from "react-hot-toast";

export function ProductsPage(): ReactElement {
  const { data: products, isLoading: loadingList } = useGetProduct();

  const [detailRequest, setDetailRequest] =
    useState<GetDetailProductRequest | null>(null);

  const { data: detail } = useGetProductDetail({ request: detailRequest });

  const { mutateAsync: updateStatusAsync, isLoading: updatingStatus } =
    useUpdateProductStatus();

  const { isOpen: CUFormIsOpen, onOpenChange: CUFormOnOpenChange } =
    useDisclosure();
  const { isOpen: ConfirmFormIsOpen, onOpenChange: ConfirmFormOnOpenChange } =
    useDisclosure();

  const renderCell = useCallback(
    (product: Product, columnKey: number) => {
      const cellValue = product[productTableColumns[columnKey].name];
      switch (productTableColumns[columnKey].name) {
        case "product":
          return (
            <User
              avatarProps={{ radius: "lg", src: product.imageUrls }}
              description={product?.brand?.name}
              name={product.name}
            />
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              size="sm"
              variant="flat"
              color={getStatusColor(product.status)}
            >
              {getStatusName(product.status)}
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
                    setDetailRequest({ id: product.id });
                    CUFormOnOpenChange();
                  }}
                >
                  <HiOutlinePencil />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Xóa">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => {
                    setDetailRequest({ id: product.id });
                    ConfirmFormOnOpenChange();
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
    [CUFormOnOpenChange, ConfirmFormOnOpenChange],
  );

  const onSubmitConfirm = async () => {
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
      ConfirmFormOnOpenChange();
    }
  };

  return (
    <div>
      <div className={"flex justify-between mb-3"}>
        <p className={"font-semibold mb-4"}>Danh sách sản phẩm</p>
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
            {productTableColumns.map((column) => (
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
            items={products?.listData ?? []}
            isLoading={loadingList}
          >
            {(item: Product) => (
              <TableRow key={item.id}>
                {(col: Key) => (
                  <TableCell>{renderCell(item, col as number)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ProductFormModal
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
        name={"Xóa sản phẩm"}
        message={"Xác nhận xóa sản phẩm này " + detail?.data.name + " ?"}
        isOpen={ConfirmFormIsOpen}
        onClose={() => {
          ConfirmFormOnOpenChange();
          setDetailRequest(null);
        }}
        onOpenChange={ConfirmFormOnOpenChange}
        onSubmit={onSubmitConfirm}
        isLoading={updatingStatus}
      />
    </div>
  );
}
