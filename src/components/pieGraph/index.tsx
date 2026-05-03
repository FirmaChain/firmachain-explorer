import styled from 'styled-components';

export type PieDatum = {
    name: string;
    value: number;
    color?: string;
    background?: string;
    percentage?: string;
    display?: string;
};

export type PieGraphType = 'circle' | 'semi-circle';

export type RadiusValue = number | `${number}%`;

export type SvgPieChartProps = {
    data: PieDatum[];
    size?: number;
    type?: PieGraphType;
    innerRadius?: RadiusValue;
    outerRadius?: RadiusValue;
    cornerRadius?: number;
    paddingAngle?: number;
};

const Svg = styled.svg`
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
`;

const Path = styled.path`
    transition: opacity 0.15s ease;

    &:hover {
        opacity: 0.85;
    }
`;

const polarToCartesian = (cx: number, cy: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

    return {
        x: cx + radius * Math.cos(angleInRadians),
        y: cy + radius * Math.sin(angleInRadians)
    };
};

const resolveRadius = (value: RadiusValue, baseRadius: number) => {
    if (typeof value === 'number') {
        return value;
    }

    return (Number(value.replace('%', '')) / 100) * baseRadius;
};

const createArcPath = ({
    cx,
    cy,
    radius,
    startAngle,
    endAngle
}: {
    cx: number;
    cy: number;
    radius: number;
    startAngle: number;
    endAngle: number;
}) => {
    const normalizedEndAngle = endAngle - startAngle >= 360 ? endAngle - 0.0001 : endAngle;

    const start = polarToCartesian(cx, cy, radius, startAngle);
    const end = polarToCartesian(cx, cy, radius, normalizedEndAngle);
    const largeArcFlag = normalizedEndAngle - startAngle > 180 ? 1 : 0;

    // Draw the center line of the arc. Stroke width controls visual thickness.
    return [`M ${start.x} ${start.y}`, `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`].join(' ');
};

const PieChart = ({
    data,
    size = 250,
    type = 'circle',
    innerRadius = 0,
    outerRadius = '100%',
    cornerRadius = 0,
    paddingAngle = 0
}: SvgPieChartProps) => {
    const total = data.reduce((acc, item) => {
        return acc + Math.max(item.value, 0);
    }, 0);

    if (total <= 0) {
        return null;
    }

    const isSemiCircle = type === 'semi-circle';

    const width = size;
    const height = isSemiCircle ? size / 2 : size;

    const cx = size / 2;
    const cy = size / 2;

    const maxRadius = size / 2;

    const resolvedOuterRadius = resolveRadius(outerRadius, maxRadius);
    const resolvedInnerRadius = resolveRadius(innerRadius, maxRadius);

    const safeOuterRadius = Math.min(Math.max(resolvedOuterRadius, 0), maxRadius);
    const safeInnerRadius = Math.min(Math.max(resolvedInnerRadius, 0), safeOuterRadius);

    const strokeWidth = safeOuterRadius - safeInnerRadius;
    const radius = safeInnerRadius + strokeWidth / 2;

    const totalAngle = isSemiCircle ? 180 : 360;
    const startBaseAngle = isSemiCircle ? -90 : 0;

    const visibleData = data.filter((item) => item.value > 0);
    const gapCount = visibleData.length > 1 ? visibleData.length : 0;
    const totalPaddingAngle = gapCount * paddingAngle;
    const availableAngle = Math.max(totalAngle - totalPaddingAngle, 0);

    let currentAngle = startBaseAngle;

    return (
        <Svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} role="img">
            {visibleData.map((item) => {
                const angle = (item.value / total) * availableAngle;

                const startAngle = currentAngle;
                const endAngle = currentAngle + angle;

                currentAngle = endAngle + (visibleData.length > 1 ? paddingAngle : 0);

                if (angle <= 0) {
                    return null;
                }

                return (
                    <Path
                        key={item.name}
                        d={createArcPath({
                            cx,
                            cy,
                            radius,
                            startAngle,
                            endAngle
                        })}
                        fill="none"
                        stroke={item.background ?? item.color}
                        strokeWidth={strokeWidth}
                        strokeLinecap={cornerRadius > 0 ? 'round' : 'butt'}
                    />
                );
            })}
        </Svg>
    );
};

export default PieChart;
