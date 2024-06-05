import Image from "next/image";
import React from "react";
import { db } from "@/lib/db";

import amanda from "@/assets/icons/amanda.jpg";

const NewsIdPage = async () => {
  const container: any = await db?.container?.findUnique({
    where: {
      id: process.env.CONTAINER_ID,
    },
  });
  const Category = ({ txt }: { txt: string }) => (
    <div
      className="border-1 rounded-[100px] border px-2 py-1 text-[10px] font-[600]"
      style={{ borderColor: container?.navDarkBackgroundColor }}
    >
      {txt}
    </div>
  );
  return (
    <div className="mx-5 mt-5 flex justify-between">
      <div className="w-[55%]">
        <div
          style={{ color: container?.navDarkBackgroundColor }}
          className={`text-[14px] font-[500]`}
        >
          Phoenix Baker • 19 Jan 2024
        </div>
        <div className={`text-[32px] font-[700]`}>UX review presentations</div>
        <div className={`text-[16px] font-[400]`}>
          How do you create compelling presentations that wow your colleagues
          and impress your managers? Find out with our in-depth guide on UX
          presentations.
        </div>
        <div className="my-3 flex items-center">
          {["UI/UX Design", "Research"]?.map((each) => (
            <Category key={each} txt={each} />
          ))}
        </div>
        <Image
          objectFit="contain"
          alt="each"
          src={amanda}
          className="my-1 flex w-full items-center justify-center overflow-hidden rounded"
        />
        <div className="text-[16px] font-[600]">Introduction:</div>
        <div className="text-[16px] font-[300]">
          In the digital era, large-scale applications wield tremendous power in
          shaping user experiences. Whether it’s a social media platform, an
          e-commerce website, or a corporate software solution, the success of
          these applications hinges on their ability to engage users
          effectively. At the heart of this lies the UI/UX design – a delicate
          balance of aesthetics, functionality, and usability. In this blog
          post, we delve into the intricacies of designing UI/UX for large-scale
          applications, exploring best practices and strategies to create
          exceptional user experiences.
        </div>
        <div className="text-[16px] font-[600]">Understanding the Scale:</div>
        <div className="text-[16px] font-[300]">
          Large-scale applications cater to diverse user bases, each with unique
          needs and preferences. Consequently, designing for scale necessitates
          a deep understanding of user personas, journey mapping, and user
          research. By comprehending the intricacies of user behavior, designers
          can tailor experiences that resonate with their audience, driving
          engagement and satisfaction. Hierarchy and Information Architecture:
          Effective UI/UX design for large-scale applications hinges on robust
          information architecture. Clear hierarchy and intuitive navigation are
          paramount to guide users through complex interfaces seamlessly.
          Employing techniques such as card sorting, tree testing, and user flow
          analysis can help designers refine information structures, ensuring
          optimal discoverability and usability.
        </div>
        <div className="text-[16px] font-[600]">
          Scalability and Performance:
        </div>
        <div className="text-[16px] font-[300]">
          Scalability is a critical consideration in UI/UX design for
          large-scale applications. As user bases grow, so do performance
          demands. Designers must prioritize performance optimization, focusing
          on factors such as loading times, responsiveness, and resource
          utilization. Embracing techniques like lazy loading, content caching,
          and progressive web app (PWA) architectures can enhance scalability
          while delivering lightning-fast user experiences.
        </div>
        <div className="text-[16px] font-[600]">Consistency and Branding:</div>
        <div className="text-[16px] font-[300]">
          Consistency breeds familiarity, a cornerstone of effective UI/UX
          design. Large-scale applications must maintain consistency across
          diverse interfaces, platforms, and devices to foster cohesive user
          experiences. Establishing robust design systems, style guides, and
          component libraries can facilitate consistency, empowering teams to
          deliver cohesive experiences while reinforcing brand identity.
        </div>
        <div className="text-[16px] font-[600]">
          Accessibility and Inclusivity:
        </div>
        <div className="text-[16px] font-[300]">
          Accessibility is not an option – it's a mandate. Large-scale
          applications must prioritize inclusivity, ensuring that all users,
          regardless of abilities, can access and engage with the platform. From
          semantic HTML markup to keyboard navigation and screen reader
          compatibility, designers must integrate accessibility principles into
          every facet of the UI/UX design process, fostering equitable
          experiences for all users.
        </div>
      </div>
      <div className="w-[40%] px-5">
        <div>More related news:</div>
        {[1, 2, 3, 4]?.map((each) => (
          <div
            key={each}
            className="border-1 my-4 flex items-center rounded border border-[#1c1629] p-1"
          >
            <div className="flex items-center justify-center overflow-hidden rounded pr-1">
              <Image
                objectFit="contain"
                alt="each"
                src={amanda}
                className="flex w-[600px] items-center justify-center overflow-hidden rounded"
              />
            </div>
            <div className="">
              <div className="flex w-full items-center justify-between">
                <Category txt="UI/UX Design" />
              </div>
              <div
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                className="txt-[16px] my-1 font-[600]"
              >
                Crafting an Exceptional UI/UX Design for Large-Scale
                Applications: Best Practices and Strategies
              </div>
              <div
                className="text-[14px] font-[400]"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                In the digital era, large-scale applications wield tremendous
                power in shaping user experiences. Whether it’s a social media
                platform, an e-commerce website, or a corporate software
                solution,
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsIdPage;
