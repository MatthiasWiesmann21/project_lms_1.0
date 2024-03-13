"use client"

import * as React from "react"
import { Globe, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDispatch } from "react-redux";


export function LanguageToggle() {
  const dispatch = useDispatch();

  // const [language, setLanguage] = React.useState("English");

  const setLanguage = (language: string) => {
    dispatch({ type: "SetLanguage", payload: language });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent border-0 ml-2" variant="outline">
          <Globe className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 tran" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("English")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("Deutsch")}>
          Deutsch
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("Francaise")}>
          Francaise
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("Italiano")}>
          Italiano
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("Espanol")}>
          Espanol
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("Portugues")}>
          Portugues
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("Russian")}>
          Russian
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("Mandarin")}>
          Mandarin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
