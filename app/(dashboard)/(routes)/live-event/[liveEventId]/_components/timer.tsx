const Each = ({ str, num }: { str: string; num: number }) => (
  <div className="m-1 flex flex-col items-center p-1">
  <div className="m-1 p-1 sm:text-sm md:text-lg lg:text-xl font-medium">
    {str}
  </div>
  <div className="m-1 p-1 text-xl sm:text-xl md:text-2xl lg:text-4xl font-black">
    {num}
  </div>
</div>
);

const Timer = ({ timeRemaining, endDateTime }: any) => (
  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md backdrop-filter">
    {new Date(endDateTime) < new Date() ? (
      <div>Event has been Ended..!!</div>
    ) : (
      <>
        <Each str="Days" num={timeRemaining?.days} />
        <Each str="Hours" num={timeRemaining?.hours} />
        <Each str="Minutes" num={timeRemaining?.minutes} />
        <Each str="Seconds" num={timeRemaining?.seconds} />
      </>
    )}
  </div>
);

export default Timer;
