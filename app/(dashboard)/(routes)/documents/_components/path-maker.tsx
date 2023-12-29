"use client";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

type Params = {
  slug: string[];
};
const basePath = process.env.BASE_PATH ?? "http://localhost:3000/";
const currentDocPath = basePath + "/documents/";
const PathMaker = () => {
  const { slug } = useParams() as Params;

 
 
 

  return (
    <div className="flex">
      {slug.map((item, index) => {
        lastPath += item + "/";
        return (
          <Link href={`${currentDocPath}/${lastPath}`} className="font-bold ">
            &nbsp;{item}/
          </Link>
        );
      })}
    </div>
  );
};
export default PathMaker;
