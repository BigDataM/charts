export const CustomizedAxisTick = (props) => {
    const { x, y, payload } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                className="timeLineLabels"
                textAnchor="middle"
                fill="#666"
            >
                {payload.value}
            </text>
        </g>
    );
}