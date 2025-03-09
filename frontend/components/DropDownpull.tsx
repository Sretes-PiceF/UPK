"use client"; // Tambahkan ini jika menggunakan Next.js
import * as React from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export default function DropdownMenuDemo() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" /> {/* Ikon titik tiga */}
                </Button>
            </DropdownMenuTrigger>
            <Link href="/Admin/profile_admin/update_admin">

                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Update</DropdownMenuItem>
                </DropdownMenuContent>
            </Link>
        </DropdownMenu>
    );
}