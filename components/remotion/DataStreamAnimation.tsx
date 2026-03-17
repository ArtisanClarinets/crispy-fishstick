import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface DataPoint {
    label: string;
    value: number;
    color: string;
}

export const DataStreamAnimation: React.FC = () => {
    const frame = useCurrentFrame();
    const { height, width } = useVideoConfig();

    const dataPoints: DataPoint[] = useMemo(() => [
        { label: 'Speed', value: 94, color: '#0ea5e9' },
        { label: 'Efficiency', value: 87, color: '#06b6d4' },
        { label: 'Uptime', value: 99, color: '#10b981' },
    ], []);

    const columnWidth = width / (dataPoints.length * 2);
    const maxHeight = height * 0.6;

    return (
        <AbsoluteFill style={{
            backgroundColor: '#111827',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '40px',
            padding: '40px',
            color: 'white',
            fontFamily: 'Inter, sans-serif'
        }}>
            {dataPoints.map((point, idx) => {
                const animationDelay = idx * 15;
                const currentFrame = Math.max(0, frame - animationDelay);
                
                const barHeight = interpolate(
                    currentFrame,
                    [0, 30],
                    [0, (point.value / 100) * maxHeight],
                    { extrapolateRight: 'clamp' }
                );

                const opacity = interpolate(
                    currentFrame,
                    [0, 20],
                    [0, 1],
                    { extrapolateRight: 'clamp' }
                );

                return (
                    <div key={idx} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                        opacity
                    }}>
                        <div style={{
                            width: columnWidth,
                            height: barHeight,
                            background: `linear-gradient(to top, ${point.color}, ${point.color}99)`,
                            borderRadius: '8px',
                            transition: 'all 0.1s ease-out',
                            boxShadow: `0 0 20px ${point.color}66`
                        }} />
                        <div style={{
                            fontSize: '16px',
                            fontWeight: 600,
                            color: point.color,
                            textAlign: 'center'
                        }}>
                            {point.label}
                        </div>
                        <div style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            color: '#fff'
                        }}>
                            {Math.round((currentFrame / 30) * point.value)}%
                        </div>
                    </div>
                );
            })}
        </AbsoluteFill>
    );
};
