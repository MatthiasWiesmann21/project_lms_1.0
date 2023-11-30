import React from 'react';

const NextcloudIframe = ({ src, width, height }) => {
  return (
    <iframe
      src={src}
      width={width || "100%"}
      height={height || "600px"}
      frameBorder="0"
      allowFullScreen
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      style={{ border: "none", overflow: "hidden" }}
      loading="lazy"
    >
      Ihr Browser unterstützt keine iframes.
    </iframe>
  );
};

export default NextcloudIframe;
