import Image from "next/image";
import React from "react";

const CourseTable = ({ courses }: { courses: any[] }) => (
  <div style={{ border: "10px solid yellow" }}>
    {courses?.map((each: any, index: number) => (
      <div key={each?.id} className="flex">
        <Image
          alt="img"
          src={each?.imageUrl}
          objectFit="contain"
          width={40}
          height={40}
        />
        <p>${each?.price}</p>
        <p>{each?.chapters?.length}</p>
      </div>
    ))}
  </div>
);

export default CourseTable;
