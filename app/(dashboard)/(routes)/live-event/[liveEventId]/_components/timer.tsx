const Each = ({ str, num }: { str: string; num: number }) => (
  <div className="m-[1%] flex flex-col items-center p-[1%]">
    <div className="m-[10px] p-[10px] text-[18px] font-extrabold">{str}</div>
    <div className="m-[10px] mt-0 p-[10px] pt-0 text-[32px] font-black">
      {num}
    </div>
  </div>
);

const Timer = ({ timeRemaining }: any) => (
  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md backdrop-filter">
    <Each str="Days" num={timeRemaining?.days} />
    <Each str="Hours" num={timeRemaining?.hours} />
    <Each str="Minutes" num={timeRemaining?.minutes} />
    <Each str="Seconds" num={timeRemaining?.seconds} />
  </div>
);

export default Timer;
