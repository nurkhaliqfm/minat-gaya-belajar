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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import BlockInvalidInputChar from "@/utils/block-invalid-input";
import { useState } from "react";
import {
  PhoneNumberNormalization,
  PhoneValidationCheck,
} from "@/utils/form-validation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DataBiodata } from "@/app/page";
dayjs.locale("id");

interface DialogProps {
  state: boolean;
  data: DataBiodata;
}
export default function EventDialog({ state, data }: DialogProps) {
  const [isPhoneValidate, setIsPhoneValidate] = useState(true);
  const [dataBiodata, setDataBiodata] = useState<DataBiodata>(data);

  const handleOnChange = (e: any) => {
    e.preventDefault();
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setIsPhoneValidate(true);

    if (
      fieldName === "hp" &&
      !PhoneValidationCheck(PhoneNumberNormalization(fieldValue))
    ) {
      setIsPhoneValidate(false);
    }

    setDataBiodata((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleOptionChange = (e: any) => {
    setDataBiodata((prevState) => ({
      ...prevState,
      isKuliah: parseInt(e),
    }));
  };

  const handleSubmit = () => {
    if (isPhoneValidate) {
      fetch("/api/me", {
        method: "PATCH",
        body: JSON.stringify(dataBiodata),
      }).then(async (res) => {
        if (res.status) {
          window.location.reload();
        }
      });
    }
  };
  return (
    <Dialog open={state}>
      <DialogContent className="max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center">
            Silahkan lengkapi data Anda
          </DialogTitle>
        </DialogHeader>
        <form className="px-4 py-2 w-full max-w-[1440px]" action={handleSubmit}>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-full">
              <Label>Kontak (No. WA)</Label>
              <Input
                placeholder="0812XXXXXXXX"
                className="my-1"
                required
                min={0}
                // type="number"
                name="hp"
                onKeyDown={BlockInvalidInputChar}
                onChange={handleOnChange}
                value={dataBiodata?.hp || ""}
              />
              <span
                className={`text-xs text-red-400 ${
                  isPhoneValidate ? "hidden" : ""
                }`}
              >
                Format nomor HP salah
              </span>
            </div>
            <div className="w-full">
              <Label>Apakah Anda Ingin Berkuliah ?</Label>
              <Select
                onValueChange={handleOptionChange}
                required
                value={dataBiodata?.isKuliah?.toString()}
              >
                <SelectTrigger className="w-full my-1">
                  <SelectValue placeholder="Silahkan Pilih.." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Ya</SelectItem>
                  <SelectItem value="1">Tidak</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" variant="destructive">
              Simpan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
