import styled from 'styled-components';

import PieChart, { SvgPieChartProps } from './';
import { useElementSize } from './useElementSize';

type ResponsivePieChartProps = SvgPieChartProps & {
    baseSize?: number;
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const ChartBox = styled.div<{
    $width: number;
    $height: number;
}>`
    width: ${({ $width }) => `${$width}px`};
    height: ${({ $height }) => `${$height}px`};
    flex: 0 0 auto;
`;

const ResponsivePieChart = ({ size, baseSize = 250, type = 'circle', ...props }: ResponsivePieChartProps) => {
    const { ref, width, height } = useElementSize();

    const isFixed = typeof size === 'number';
    const isSemiCircle = type === 'semi-circle';

    const measuredSize = isSemiCircle ? Math.min(width, height * 2) : Math.min(width, height);

    const chartSize = size ?? measuredSize;

    const chartWidth = chartSize;
    const chartHeight = isSemiCircle ? chartSize / 2 : chartSize;

    const shouldRender = isFixed || chartSize > 0;

    return (
        <Container ref={isFixed ? undefined : ref}>
            {shouldRender && (
                <ChartBox $width={chartWidth} $height={chartHeight}>
                    <PieChart {...props} type={type} size={isFixed ? size : baseSize} />
                </ChartBox>
            )}
        </Container>
    );
};

export default ResponsivePieChart;
