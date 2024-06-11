"use client";

import * as React from "react";

const CareerPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div>
      <h1>Career Page</h1>
      <p>In Development for Motu</p>
    </div>
  );
};

export default CareerPage;
