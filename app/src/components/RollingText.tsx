interface RollingTextProps {
  text: string;
  className?: string;
}

const RollingText = ({ text, className = "" }: RollingTextProps) => {
  const chars = text.split("");

  return (
    <div className={`rolling-text ${className}`}>
      <div className="block">
        {chars.map((char, i) => (
          <span
            className="letter"
            key={`top-${i}`}
            style={{ transitionDelay: `${i * 0.015}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
      <div className="block">
        {chars.map((char, i) => (
          <span
            className="letter"
            key={`bot-${i}`}
            style={{ transitionDelay: `${i * 0.015}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RollingText;
