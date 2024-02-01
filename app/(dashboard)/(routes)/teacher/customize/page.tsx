import { db } from "@/lib/db";
import { ImageForm } from "./_components/image-form";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import { Image } from "lucide-react";

const CustomizeSettingsPage = async () => {

  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const post = await db.post.findMany();

    return ( 
        <div className="px-20 justify-center align-top h-full">
          <div className="mt-5 flex items-center gap-x-2">
              <IconBadge icon={Image} />
              <h2 className="text-xl">
                Add an Logo for your Plattform
              </h2>
          </div>
      </div>
     );
}
 
export default CustomizeSettingsPage;