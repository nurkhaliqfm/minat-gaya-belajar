interface CircleProgressProps {
  current: number;
  end: number;
}

const CircleProgress = ({ current, end }: CircleProgressProps) => {
  const circleProps = {
    width: 180,
    height: 180,
    radius: 70,
  };

  const percentage = (current / end) * 100;

  const dashArray = circleProps.radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;
  return (
    <>
      <svg width={circleProps.width} height={circleProps.height}>
        <defs>
          <linearGradient id="progress-gradient">
            <stop offset={"0%"} stopColor="#1e40af" />
            <stop offset={"100%"} stopColor=" #7c3aed" />
          </linearGradient>
        </defs>
        <circle
          cx={circleProps.width / 2}
          cy={circleProps.height / 2}
          r={circleProps.radius}
          strokeWidth={10}
          fill="none"
          className="stroke-slate-300"
        />
        <circle
          cx={circleProps.width / 2}
          cy={circleProps.height / 2}
          r={circleProps.radius}
          strokeWidth={10}
          fill="none"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
          transform={`rotate(-90 ${circleProps.width / 2} ${
            circleProps.width / 2
          } )`}
          stroke="url(#progress-gradient)"
        />
        <text
          x={circleProps.width / 2}
          y={circleProps.height / 2}
          textAnchor="middle"
          dy={8}
          className="font-extrabold text-2xl "
        >
          {current}/{end}
        </text>
      </svg>
    </>
  );
};

export default CircleProgress;
