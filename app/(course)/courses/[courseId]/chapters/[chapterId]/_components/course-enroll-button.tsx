"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`)

      window.location.assign(response.data.url);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  if(price === 0) {
    return (
      <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-32 md:w-32 bg-emerald-500 hover:bg-emerald-600"
    >
      Enroll for Free
    </Button>
    )
  }
  else {
    return (
      <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-32 md:w-32"
    >
      Enroll for {formatPrice(price)}
    </Button>
    )
  }
}