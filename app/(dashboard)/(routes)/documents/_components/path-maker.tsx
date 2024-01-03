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

  let lastPath = "";

  return (
    <div className="flex">
      {slug.map((item, index) => {
        lastPath += item + "/";
        if (index == 0) {
          return (
            <Link href={`/documents`} className="font-bold ">
              &nbsp;root/
            </Link>
          );
        }
        return (
          <Link href={`/documents/${lastPath}`} className="font-bold ">
            &nbsp;{item}/
          </Link>
        );
      })}
    </div>
  );
};
export default PathMaker;
