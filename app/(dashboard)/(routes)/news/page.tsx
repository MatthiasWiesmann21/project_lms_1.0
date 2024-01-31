import { getPosts } from "@/actions/get-posts";
import { PostList } from "@/components/post-list";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const NewsPage = async () => {


    const posts = await getPosts(
        { 
            // @ts-ignore
            sort: "createdAt", 
        }
    );
    
    const { userId } = auth();
    
    if (!userId) {
        return redirect("/dashboard");
    }

    return ( 
        <div className="space-y-4 p-6 dark:bg-[#313338]">
            <PostList items={posts} />
        </div>
     );
}
 
export default NewsPage;