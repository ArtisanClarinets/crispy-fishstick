import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const VantusDynamicHero: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Subtle drift animation
    const driftY = Math.sin(frame / 60) * 10;
    
    // Scale-in effect for the main message
    const scale = interpolate(frame, [0, 30], [0.8, 1], {
        extrapolateRight: 'clamp',
    });

    const opacity = interpolate(frame, [0, 20], [0, 1]);

    return (
        <AbsoluteFill style={{ 
            backgroundColor: '#020617', 
            justifyContent: 'center', 
            alignItems: 'center',
            color: 'white',
            fontFamily: 'Inter, sans-serif'
        }}>
            {/* Background geometric shapes */}
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                opacity: 0.2
            }}>
                {[...Array(5)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width: 400,
                        height: 400,
                        border: '1px solid #3b82f6',
                        borderRadius: '24px',
                        left: `${(i * 25) % 100}%`,
                        top: `${(i * 30) % 100}%`,
                        transform: `rotate(${frame / (2 + i)}deg)`,
                    }} />
                ))}
            </div>

            <div style={{
                textAlign: 'center',
                transform: `scale(${scale}) translateY(${driftY}px)`,
                opacity,
                zIndex: 10
            }}>
                <h1 style={{ 
                    fontSize: 80, 
                    fontWeight: 900, 
                    margin: 0,
                    letterSpacing: '-0.05em',
                    background: 'linear-gradient(to right, #60a5fa, #3b82f6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    TECH MADE SIMPLE.
                </h1>
                <p style={{ 
                    fontSize: 32, 
                    fontWeight: 400, 
                    color: '#94a3b8',
                    marginTop: 20
                }}>
                    We fix the leaks. You grow the business.
                </p>
            </div>
        </AbsoluteFill>
    );
};
