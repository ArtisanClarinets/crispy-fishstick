'use client';

import React from 'react';
import { RemotionDemo } from '@/components/remotion/RemotionDemo';

interface RemotionSectionProps {
    title: string;
    description: string;
    compositionId: 'hero' | 'data';
    dark?: boolean;
}

export const RemotionSection: React.FC<RemotionSectionProps> = ({
    title,
    description,
    compositionId,
    dark = false
}) => {
    return (
        <section
            style={{
                background: dark ? '#020617' : '#f8fafc',
                padding: '64px 24px',
                minHeight: '700px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div style={{ maxWidth: '1400px', width: '100%' }}>
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <h2
                        style={{
                            fontSize: '42px',
                            fontWeight: 700,
                            color: dark ? '#fff' : '#020617',
                            margin: 0,
                            marginBottom: '16px'
                        }}
                    >
                        {title}
                    </h2>
                    <p
                        style={{
                            fontSize: '18px',
                            color: dark ? '#cbd5e1' : '#475569',
                            margin: 0,
                            maxWidth: '600px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                    >
                        {description}
                    </p>
                </div>

                <RemotionDemo compositionId={compositionId} />
            </div>
        </section>
    );
};
