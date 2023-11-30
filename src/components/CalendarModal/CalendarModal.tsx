import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { DateCalendar } from "@mui/x-date-pickers";
import { useState } from "react";
import moment, { Moment } from "moment";

export interface CalendarModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (date: Moment) => void;
  minDate?: Moment;
  maxDate?: Moment;
}

export function CalendarModal({
  isOpen,
  onOpenChange,
  onSubmit,
  minDate,
  maxDate,
}: CalendarModalProps) {
  const [value, setValue] = useState<moment.Moment>(moment);
  const submitPreHandle = () => {
    onSubmit(value);
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Chọn thời gian
            </ModalHeader>
            <ModalBody>
              <DateCalendar
                value={value}
                onChange={(date) => date !== null && setValue(date)}
                minDate={minDate}
                maxDate={maxDate}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Đóng
              </Button>
              <Button color="primary" onPress={submitPreHandle}>
                Chọn
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
