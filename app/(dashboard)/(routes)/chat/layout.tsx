import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat",
};

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {/* <div className="fixed inset-y-0 z-30 mt-[80px] hidden h-full w-[72px] flex-col md:flex"> */}
      {/* <NavigationSidebar /> */}
      {/* </div> */}
      <main className="h-[96%] w-full mx-2 overflow-hidden rounded-[16px] dark:bg-[#0A0118]">
        <SocketProvider>
          <ModalProvider />
          <QueryProvider>{children}</QueryProvider>
        </SocketProvider>
      </main>
    </div>
  );
};

export default MainLayout;
