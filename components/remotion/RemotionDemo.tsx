import React, { Suspense } from 'react';
import { Player } from '@remotion/player';
import { VantusDynamicHero } from './VantusDynamicHero';
import { DataStreamAnimation } from './DataStreamAnimation';

interface RemotionDemoProps {
    compositionId: 'hero' | 'data';
}

export const RemotionDemo: React.FC<RemotionDemoProps> = ({ compositionId }) => {
    const fps = 30;
    const durationInFrames = 150;

    const getComposition = () => {
        switch (compositionId) {
            case 'hero':
                return VantusDynamicHero;
            case 'data':
                return DataStreamAnimation;
            default:
                return VantusDynamicHero;
        }
    };

    const Composition = getComposition();

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '1400px',
                margin: '0 auto',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
            }}
        >
            <Suspense fallback={<div style={{ background: '#020617', height: '500px' }} />}>
                <Player
                    component={Composition}
                    durationInFrames={durationInFrames}
                    compositionWidth={1400}
                    compositionHeight={800}
                    fps={fps}
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    controls
                    loop
                />
            </Suspense>
        </div>
    );
};
