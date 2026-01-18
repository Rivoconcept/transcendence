type Props = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};


export default function CtaButton({ label, onClick }: Props) {
  return (
    <button className="cta" onClick={onClick}>
      <span className="span">{label}</span>
      <span className="second">
        <svg
          width="50px"
          height="20px"
          viewBox="0 0 66 43"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="arrow" fill="none" fillRule="evenodd">
            <path className="one" d="M40.154...Z" fill="#FFFFFF" />
            <path className="two" d="M20.154...Z" fill="#FFFFFF" />
            <path className="three" d="M0.154...Z" fill="#FFFFFF" />
          </g>
        </svg>
      </span>
    </button>
  );
}
