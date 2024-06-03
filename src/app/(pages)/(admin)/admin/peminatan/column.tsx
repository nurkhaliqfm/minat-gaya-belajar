"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type StudentResult = {
  no: string;
  name: string;
  result:
    | "K1 - Kecerdasan Verbal"
    | "K2 - Kecerdasan Logis"
    | "K3 - Kecerdasan Visual"
    | "K4 - Kecerdasan Kinestetik"
    | "K5 - Kecerdasan Musikal"
    | "K6 - Kecerdasan Intepersonal"
    | "K7 - Kecerdasan Intrapersonal"
    | "K8 - Kecerdasan Naturalis";
  ket: string;
  isKuliah: string;
};

export const columns: ColumnDef<StudentResult>[] = [
  {
    accessorKey: "no",
    header: "No.",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "ket",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hasil
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isKuliah",
    header: "Ingin Kuliah",
  },
  {
    accessorKey: "result",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hasil
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
