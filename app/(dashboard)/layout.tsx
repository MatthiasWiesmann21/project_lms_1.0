import Footer from "./_components/footer";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <div className="flex flex-col h-full">
    <div className="flex-1" data-dashlane-rid="b6c3117a5ff821c0" data-form-type="other">
      <div className="h-[80px] md:pl-72 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-72 pt-[80px] h-full">
        {children}
      </main>
    </div>
        <Footer />
    </div>
   );
}
 
export default DashboardLayout;