const SvgIcon = ({ iconId, className = '', width, height }) => (
    <svg
        className={className}
        width={width}
        height={height}
        aria-hidden="true"
    >
        <use xlinkHref={`/icons/symbol-defs.svg#${iconId}`} />
    </svg>
);

export default SvgIcon;