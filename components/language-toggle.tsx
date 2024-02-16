"use client"

import * as React from "react"
import { Globe, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageToggle() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent border-0" variant="outline" size="icon">
        <Globe className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 tran" />
        <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
        English
        </DropdownMenuItem>
        <DropdownMenuItem>
        Deutsch
        </DropdownMenuItem>
        <DropdownMenuItem>
        Francaise
        </DropdownMenuItem>
        <DropdownMenuItem>
         Italiano
        </DropdownMenuItem>
        <DropdownMenuItem>
        Espanol
        </DropdownMenuItem>
        <DropdownMenuItem>
         Portugues
        </DropdownMenuItem>
        <DropdownMenuItem>
         Russian
        </DropdownMenuItem>
        <DropdownMenuItem>
         Mandarin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
