import React from "react";
import ReactPlayer from "react-player";

const UniversalPlayer = ({ url }: any) => {
  return (
    <ReactPlayer
      style={{}}
      url={url}
      controls={true}
      width="100%"
      height="100%"
    />
  );
};

export default UniversalPlayer;
