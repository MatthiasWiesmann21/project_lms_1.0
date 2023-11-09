import Image from "next/image"
import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full border-t">
        <SidebarRoutes />
      </div>
      <div className="flex-grow flex justify-center items-end pb-5">
        <div className="flex items-center">
        <span className="mr-1 text-sm font-medium text-gray-600">Powered by</span>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.5 9H8.5L12 2Z" fill="#4A5568"/>
          <path d="M12 22L8.5 15H15.5L12 22Z" fill="#4A5568"/>
          <path d="M2 12L9 8.5V15.5L2 12Z" fill="#4A5568"/>
          <path d="M22 12L15 15.5V8.5L22 12Z" fill="#4A5568"/>
        </svg>
        <span className="ml-1 text-sm font-medium text-gray-600">Logoipsum</span>
        </div>
      </div>
    </div>
  )
}