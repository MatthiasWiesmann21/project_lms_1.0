import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";
import { languageServer } from "@/lib/check-language-server";
import { db } from "@/lib/db";


export const Sidebar = async () => {
  const currentLanguage = await languageServer();
  const navColor = await db.container.findUnique({
    where: {
      id: process.env.CONTAINER_ID,
    },
  });

  const container = await db.container.findUnique({
    where: {
      id: process.env.CONTAINER_ID,
    }}
  )


  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-white shadow-sm dark:bg-[#1e1f22]">
      <div className="pt-2 px-4 py-2">
        <Logo 
          imageUrl={container?.imageUrl || ""}
          imageUrlDark={container?.imageUrlDark || ""}
          link={container?.link || ""}
        />
      </div>
      <div className="flex w-full flex-col border-t ">
        <SidebarRoutes 
          navPrimaryColor={navColor?.navPrimaryColor || '#ff00ff'}
          navDarkPrimaryColor={navColor?.navDarkPrimaryColor || '#ff00ff'} 
          navBackgroundColor={navColor?.navBackgroundColor || '#ff00ff'}
          navDarkBackgroundColor={navColor?.navDarkBackgroundColor || '#ff00ff'}
        />
      </div>
      <div className="flex flex-grow items-end justify-center pb-5">
        <div className="flex items-center">
          <span className="mr-1 text-sm font-medium text-gray-600">
            Made by
          </span>
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L15.5 9H8.5L12 2Z" fill="#4A5568" />
            <path d="M12 22L8.5 15H15.5L12 22Z" fill="#4A5568" />
            <path d="M2 12L9 8.5V15.5L2 12Z" fill="#4A5568" />
            <path d="M22 12L15 15.5V8.5L22 12Z" fill="#4A5568" />
          </svg>
          <span className="ml-1 text-sm font-medium text-gray-600">
            Logoipsum
          </span>
        </div>
      </div>
    </div>
  );
};
