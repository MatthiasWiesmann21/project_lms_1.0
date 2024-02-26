"use client";

import { useIsAdmin } from "@/lib/roleCheck";
import { useSelector } from "react-redux";

export const CourseCounter = () => {
    const client = useSelector((state: any) => state?.user);
    const isRoleAdmins = useIsAdmin();
    const canAccess = isRoleAdmins;
    const starterMaxCourses = 20;
    
        if(client?.container?.clientPackage === "STARTER" && canAccess) {
            return (
                <div>
                    <h1>Course Counter</h1>
                    <p>You have ? courses available. "current amount"/{starterMaxCourses} </p>
                </div>
            )
        }
}