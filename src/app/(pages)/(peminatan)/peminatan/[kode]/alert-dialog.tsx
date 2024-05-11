import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  HiOutlineBuildingOffice,
  HiOutlineCalendarDays,
  HiOutlineMagnifyingGlass,
  HiOutlineUser,
  HiOutlineWallet,
} from "react-icons/hi2";

import dayjs from "dayjs";
import "dayjs/locale/id";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
dayjs.locale("id");

interface DialogProps {
  handleAlert: Function;
  state: boolean;
}
export default function AlertDialog({ handleAlert, state }: DialogProps) {
  return (
    <Dialog open={state}>
      <DialogContent className="max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center">Informasi</DialogTitle>
        </DialogHeader>
        <div className="text-center">
          Anda belum menyelesaikan sesi sebelumnya. Apakah anda ingin memulai
          dari awal atau melanjutkan sesi sebelumnya ?
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button onClick={() => handleAlert(false)} variant="destructive">
            Mulai Lagi
          </Button>
          <Button onClick={() => handleAlert(true)} variant="default">
            Lanjutkan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
