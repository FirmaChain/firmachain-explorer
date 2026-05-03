import { ReactNode } from 'react';
import { alpha, useTheme } from '@mui/material/styles';

type ConsensusRingProps = {
    size: number;
    strokeWidth: number;
    value: number;
    children?: ReactNode;
};

export const ConsensusRing = ({ size, strokeWidth, value, children }: ConsensusRingProps) => {
    const theme = useTheme();

    const normalizedValue = Math.max(0, Math.min(100, value));
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - normalizedValue / 100);

    return (
        <div
            style={{
                position: 'relative',
                width: size,
                height: size
            }}
        >
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={{
                    display: 'block',
                    transform: 'rotate(-90deg)',
                    overflow: 'visible'
                }}
            >
                {/* Background ring */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={alpha(theme.palette.primary.main, 0.4)}
                    strokeWidth={strokeWidth}
                />

                {/* Progress ring */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={theme.palette.primary.main}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    style={{
                        transition: 'stroke-dashoffset 260ms ease'
                    }}
                />
            </svg>

            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    pointerEvents: 'none'
                }}
            >
                {children}
            </div>
        </div>
    );
};
