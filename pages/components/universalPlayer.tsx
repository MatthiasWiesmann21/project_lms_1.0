import React from "react";
import ReactPlayer from "react-player";

const UniversalPlayer = ({ url, style }: any) => {
  return (
    <ReactPlayer
      style={{ ...style }}
      url={url}
      controls={true}
      width="100%"
      height="100%"
    />
  );
};

export default UniversalPlayer;
