// const ThumbSvg = (props) => (
const ThumbSvg = ({
  fill,
  className = "",
}: {
  fill?: string;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    id="IconChangeColor"
    height="30"
    width="30"
    className={`cursor-pointer ${className}`}
  >
    <rect width="256" height="256" fill="none"></rect>
    <path
      d="M32,104H80a0,0,0,0,1,0,0V208a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V112A8,8,0,0,1,32,104Z"
      fill={fill || "none"}
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="8"
      id="mainIconPathAttribute"
    ></path>
    <path
      d="M80,104l40-80a32,32,0,0,1,32,32V80h61.9a15.9,15.9,0,0,1,15.8,18l-12,96a16,16,0,0,1-15.8,14H80"
      fill={fill || "none"}
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="8"
      id="mainIconPathAttribute"
    ></path>
  </svg>
);
export default ThumbSvg;
