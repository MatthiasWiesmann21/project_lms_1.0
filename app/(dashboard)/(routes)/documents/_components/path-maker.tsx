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
      {/* {slug.map((item, index) => {
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
      })} */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          {slug.map((item, index) => {
            lastPath += item + "/";
            if (index == 0) {
              return (
                <li>
                  <div>
                    <a href={`/documents`} className="text-gray-400 hover:text-gray-500">
                      <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd" />
                      </svg>
                      <span className="sr-only">Home</span>
                    </a>
                  </div>
                </li>
              );
            }
            return (
              <li>
                <div className="flex items-center">
                  <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                  </svg>
                  <a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{decodeURIComponent(item)}</a>
                </div>
              </li>
            );
          })}
          {/* <li>
            <div className="flex items-center">
              <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
              </svg>
              <a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" aria-current="page">Project Nero</a>
            </div>
          </li> */}
        </ol>
      </nav>
    </div>
  );
};
export default PathMaker;
