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
      <main className="mx-2 h-[96%] w-full overflow-hidden rounded-[16px] dark:bg-[#0A0118]">
        <SocketProvider>
          <ModalProvider />
          <QueryProvider>{children}</QueryProvider>
        </SocketProvider>
      </main>
    </div>
  );
};

export default MainLayout;
