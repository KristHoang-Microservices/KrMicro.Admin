import { Key, ReactElement, useCallback, useMemo, useState } from "react";
import {
  Button,
  Chip,
  Pagination,
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
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlinePencil,
  HiOutlineTrash,
  HiPlus,
} from "react-icons/hi";
import { ProductFormModal } from "./components/ProductFormModal";
import { GetDetailProductRequest } from "../../../api/masterData/requests/product";
import { ConfirmForm } from "../../../components/ConfirmForm";
import { Status } from "../../../models/status.enum.ts";
import { toast } from "react-hot-toast";
import { SizeFormModal } from "./components/SizeFormModal";

export function ProductsPage(): ReactElement {
  const { data: products, isLoading: loadingList } = useGetProduct();

  const [detailRequest, setDetailRequest] =
    useState<GetDetailProductRequest | null>(null);

  const { data: detail } = useGetProductDetail({ request: detailRequest });

  const { mutateAsync: updateStatusAsync, isLoading: updatingStatus } =
    useUpdateProductStatus();

  const { isOpen: CUFormIsOpen, onOpenChange: CUFormOnOpenChange } =
    useDisclosure();
  const { isOpen: SizeFormIsOpen, onOpenChange: SizeFormOnOpenChange } =
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
    (product: Product, columnKey: number) => {
      const cellValue = product[productTableColumns[columnKey].name];
      switch (productTableColumns[columnKey].name) {
        case "product":
          return (
            <User
              avatarProps={{
                radius: "lg",
                src: product.imageUrls,
                className: " min-w-[75px] min-h-[75px]",
              }}
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
        case "size":
          return (
            <Button
              onClick={() => {
                setDetailRequest({ id: product.id });
                SizeFormOnOpenChange();
              }}
            >
              {product.productSizes.length} size
            </Button>
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
              <Tooltip
                color={
                  product.status === Status.Available ? "primary" : "danger"
                }
                content="Hiển thị"
              >
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => {
                    setDetailRequest({ id: product.id });
                    ConfirmVisibleFormOnOpenChange();
                  }}
                >
                  {product.status === Status.Available ? (
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
                    setDetailRequest({ id: product.id });
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

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil((products?.listData?.length ?? 0) / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return products?.listData?.slice(start, end);
  }, [page, products?.listData]);

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
        <Table
          aria-label="Example table with custom cells"
          fullWidth={true}
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
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
            items={items ?? []}
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

      <SizeFormModal
        isOpen={SizeFormIsOpen}
        onClose={() => {
          SizeFormOnOpenChange();
          setDetailRequest(null);
        }}
        isUpdating={detailRequest !== null}
        onOpenChange={SizeFormOnOpenChange}
        data={detailRequest !== null ? detail?.data : undefined}
      />

      <ConfirmForm
        name={"Xóa sản phẩm"}
        message={"Xác nhận xóa sản phẩm này " + detail?.data.name + " ?"}
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
        name={"Đổi trạng thái hiển thị sản phẩm"}
        message={`Xác nhận ${
          detail?.data.status === Status.Available ? "ẩn" : "hiện"
        } sản phẩm này ${detail?.data.name} ?`}
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
