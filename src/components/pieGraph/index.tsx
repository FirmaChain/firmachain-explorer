import { useLayoutEffect, useRef, useState } from 'react';
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

export type PieChartProps = {
    data: PieDatum[];
    size?: number;
    type?: PieGraphType;
    innerRadius?: RadiusValue;
    outerRadius?: RadiusValue;
    cornerRadius?: number;
    paddingAngle?: number;
};

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SvgBox = styled.div<{
    $width: number;
    $height: number;
}>`
    width: ${({ $width }) => `${$width}px`};
    height: ${({ $height }) => `${$height}px`};
    flex: 0 0 auto;
`;

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

const useElementSize = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [elementSize, setElementSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        const element = ref.current;

        if (!element) return;

        const updateSize = () => {
            const rect = element.getBoundingClientRect();

            setElementSize((prev) => {
                if (prev.width === rect.width && prev.height === rect.height) {
                    return prev;
                }

                return {
                    width: rect.width,
                    height: rect.height
                };
            });
        };

        updateSize();

        const observer = new ResizeObserver(updateSize);

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return {
        ref,
        width: elementSize.width,
        height: elementSize.height
    };
};

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

const PieChartSvg = ({
    data,
    size,
    type,
    innerRadius,
    outerRadius,
    cornerRadius,
    paddingAngle
}: Omit<PieChartProps, 'size'> & {
    size: number;
}) => {
    const total = data.reduce((acc, item) => acc + Math.max(item.value, 0), 0);

    if (total <= 0) {
        return null;
    }

    const isSemiCircle = type === 'semi-circle';

    const width = size;
    const height = isSemiCircle ? size / 2 : size;

    const cx = size / 2;
    const cy = size / 2;

    const maxRadius = size / 2;

    const safeOuterRadius = Math.min(Math.max(resolveRadius(outerRadius ?? '100%', maxRadius), 0), maxRadius);
    const safeInnerRadius = Math.min(Math.max(resolveRadius(innerRadius ?? 0, maxRadius), 0), safeOuterRadius);

    const strokeWidth = safeOuterRadius - safeInnerRadius;
    const radius = safeInnerRadius + strokeWidth / 2;

    const totalAngle = isSemiCircle ? 180 : 360;
    const startBaseAngle = isSemiCircle ? -90 : 0;

    const visibleData = data.filter((item) => item.value > 0);
    const gapCount = visibleData.length > 1 ? visibleData.length : 0;
    const availableAngle = Math.max(totalAngle - gapCount * (paddingAngle ?? 0), 0);

    let currentAngle = startBaseAngle;

    return (
        <Svg viewBox={`0 0 ${width} ${height}`} role="img">
            {visibleData.map((item) => {
                const angle = (item.value / total) * availableAngle;

                const startAngle = currentAngle;
                const endAngle = currentAngle + angle;

                currentAngle = endAngle + (visibleData.length > 1 ? (paddingAngle ?? 0) : 0);

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
                        strokeLinecap={(cornerRadius ?? 0) > 0 ? 'round' : 'butt'}
                    />
                );
            })}
        </Svg>
    );
};

const PieChart = ({
    data,
    size,
    type = 'circle',
    innerRadius = 0,
    outerRadius = '100%',
    cornerRadius = 0,
    paddingAngle = 0
}: PieChartProps) => {
    const { ref, width, height } = useElementSize();

    const isSemiCircle = type === 'semi-circle';

    const responsiveSize = isSemiCircle ? Math.min(width, height * 2) : Math.min(width, height);

    const chartSize = size ?? responsiveSize;

    if (chartSize <= 0) {
        return <Wrapper ref={ref} />;
    }

    const chartWidth = chartSize;
    const chartHeight = isSemiCircle ? chartSize / 2 : chartSize;

    return (
        <Wrapper ref={ref}>
            <SvgBox $width={chartWidth} $height={chartHeight}>
                <PieChartSvg
                    data={data}
                    size={chartSize}
                    type={type}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    cornerRadius={cornerRadius}
                    paddingAngle={paddingAngle}
                />
            </SvgBox>
        </Wrapper>
    );
};

export default PieChart;
