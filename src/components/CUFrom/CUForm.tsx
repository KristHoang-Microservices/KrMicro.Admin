import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ReactElement, ReactNode } from "react";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";

interface CUFormProps<TRequest extends FieldValues> {
  name: string;
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  onOpenChange: (isOpen?: boolean) => void;
  onSubmit: (data: TRequest) => void;
  handleSubmit: UseFormHandleSubmit<TRequest>;

  isUpdating: boolean;
  children?: ReactElement | ReactElement[] | ReactNode;
  isLoading: boolean;
}

export function CUForm<TRequest extends FieldValues>({
  name,
  isOpen,
  onClose,
  onReset,
  onOpenChange,
  onSubmit,
  handleSubmit,
  isUpdating,
  children,
  isLoading = false,
}: CUFormProps<TRequest>): ReactElement {
  return (
    <Modal
      backdrop={"opaque"}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      size={"4xl"}
      scrollBehavior={"inside"}
      isDismissable={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">{name}</ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter className={"flex justify-between"}>
            <div>
              <Button
                isLoading={isLoading}
                color={"default"}
                variant="light"
                onPress={onReset}
              >
                Đặt lại
              </Button>
            </div>
            <div className={"flex gap-2"}>
              <Button
                isLoading={isLoading}
                color="danger"
                variant="light"
                onPress={onClose}
              >
                Đóng
              </Button>
              <Button isLoading={isLoading} color="primary" type={"submit"}>
                {isUpdating ? "Cập nhật" : "Thêm"}
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
