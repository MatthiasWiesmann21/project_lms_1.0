import React from 'react';

const NextcloudIframe = ({ src, width, height }) => {
  return (
    <iframe
      src={src}
      width={width || "100%"}
      height={height || "600px"}
      allowFullScreen
      style={{ border: "none", overflow: "hidden" }}
    >
    </iframe>
  );
};

export default NextcloudIframe;
