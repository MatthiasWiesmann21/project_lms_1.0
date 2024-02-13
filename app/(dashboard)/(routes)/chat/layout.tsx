import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { SocketProvider } from "@/components/providers/socket-provider";

const MainLayout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <div className="h-full">
      <div className="hidden h-full mt-[80px] md:flex w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="h-full">
          <SocketProvider>
            <ModalProvider />
              <QueryProvider>
                {children}
              </QueryProvider>
          </SocketProvider>
      </main>
    </div>
   );
}
 
export default MainLayout;