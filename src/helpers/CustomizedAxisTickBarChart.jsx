export const CustomizedAxisTickBarChart = (props) => {
    const { x, y, payload } = props;

    const barLabels = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
    ];

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                className="labels"
                textAnchor="middle"
                fill="#666"
            >
                {barLabels[payload.index]}
            </text>
        </g>
    );
}