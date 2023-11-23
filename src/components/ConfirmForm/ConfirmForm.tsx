import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ReactElement } from "react";

interface ConfirmFormProps {
  name: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen?: boolean) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function ConfirmForm({
  name,
  message,
  isOpen,
  onClose,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: ConfirmFormProps): ReactElement {
  return (
    <Modal
      backdrop={"opaque"}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      size={"sm"}
      scrollBehavior={"inside"}
      isDismissable={false}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{name}</ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter className={"flex justify-between"}>
          <Button
            isLoading={isLoading}
            color="danger"
            variant="light"
            onPress={onClose}
          >
            Đóng
          </Button>
          <Button isLoading={isLoading} color="primary" onClick={onSubmit}>
            {"Xác nhận"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
