import React from 'react';

export const VantusSMBHomepage = () => {
    return (
        <div style={{
            background: '#fff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            lineHeight: '1.6',
            color: '#1a1a1a'
        }}>
            {/* Hero Section */}
            <section
                style={{
                    background: 'linear-gradient(135deg, #0d7ff2 0%, #0f184c 100%)',
                    color: '#fff',
                    padding: '80px 24px',
                    textAlign: 'center',
                    minHeight: '500px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div style={{ maxWidth: '700px' }}>
                    <h1
                        style={{
                            fontSize: '56px',
                            fontWeight: 700,
                            margin: '0 0 24px 0',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        We Make Tech Simple.
                    </h1>
                    <p
                        style={{
                            fontSize: '22px',
                            lineHeight: '1.5',
                            margin: '0 0 40px 0',
                            opacity: 0.95,
                            fontWeight: 400
                        }}
                    >
                        Running a business is hard. Your tech shouldn&apos;t be. We fix your digital leaks and help you grow without the headache.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <span
                            style={{
                                display: 'inline-block',
                                background: 'rgba(255, 255, 255, 0.2)',
                                padding: '8px 16px',
                                borderRadius: '24px',
                                fontSize: '14px',
                                fontWeight: 600
                            }}
                        >
                            ⚡ High-Speed Results
                        </span>
                        <span
                            style={{
                                display: 'inline-block',
                                background: 'rgba(255, 255, 255, 0.2)',
                                padding: '8px 16px',
                                borderRadius: '24px',
                                fontSize: '14px',
                                fontWeight: 600
                            }}
                        >
                            ✨ Unique Experiences
                        </span>
                    </div>
                </div>
            </section>

            {/* The Problem Section */}
            <section
                style={{
                    background: '#1e293b',
                    color: '#fff',
                    padding: '80px 24px',
                    textAlign: 'center'
                }}
            >
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h2
                        style={{
                            fontSize: '48px',
                            fontWeight: 700,
                            margin: '0 0 16px 0'
                        }}
                    >
                        Wasted Time Is Wasted Money.
                    </h2>
                    <p
                        style={{
                            fontSize: '18px',
                            color: '#cbd5e1',
                            margin: '0 0 48px 0'
                        }}
                    >
                        Sound like your situation? Here&apos;s what we hear from business owners like you:
                    </p>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '32px'
                        }}
                    >
                        {[
                            'Slow websites lose customers before they even say hello.',
                            'Tech breaks at the worst times. Your team scrambles.',
                            'Nobody explains what&apos;s happening. It&apos;s all confusing jargon.'
                        ].map((problem, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    padding: '32px 24px',
                                    textAlign: 'left'
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '32px',
                                        marginBottom: '16px'
                                    }}
                                >
                                    ⚠️
                                </div>
                                <p
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 500,
                                        margin: 0,
                                        lineHeight: 1.6
                                    }}
                                >
                                    {problem}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dynamic Remotion Placeholder */}
            <section
                style={{
                    background: '#020617',
                    padding: '80px 24px',
                    minHeight: '800px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div style={{ maxWidth: '1400px', width: '100%' }}>
                    <h2
                        style={{
                            fontSize: '42px',
                            fontWeight: 700,
                            color: '#fff',
                            textAlign: 'center',
                            margin: '0 0 48px 0'
                        }}
                    >
                        See the Difference
                    </h2>
                    <div
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '2px solid rgba(59, 130, 246, 0.3)',
                            borderRadius: '16px',
                            padding: '60px 40px',
                            textAlign: 'center',
                            color: '#94a3b8',
                            fontFamily: 'monospace'
                        }}
                    >
                        <p style={{ fontSize: '20px', margin: '0 0 16px 0' }}>
                            🎬 Interactive Animation Experience
                        </p>
                        <p style={{ fontSize: '16px', margin: 0 }}>
                            This space will showcase your business transformation in real-time.
                        </p>
                    </div>
                </div>
            </section>

            {/* The Solution Section */}
            <section
                style={{
                    background: '#f8fafc',
                    padding: '80px 24px'
                }}
            >
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2
                        style={{
                            fontSize: '48px',
                            fontWeight: 700,
                            textAlign: 'center',
                            margin: '0 0 16px 0'
                        }}
                    >
                        Your Business, Upgraded.
                    </h2>
                    <p
                        style={{
                            fontSize: '18px',
                            color: '#475569',
                            textAlign: 'center',
                            margin: '0 0 64px 0',
                            maxWidth: '600px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                    >
                        We take the complexity out. Here&apos;s what changes:
                    </p>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '32px'
                        }}
                    >
                        {[
                            {
                                icon: '⚡',
                                title: 'Lightning Fast',
                                desc: 'Websites that load in under 1 second. No waiting.'
                            },
                            {
                                icon: '🛡️',
                                title: 'Always On',
                                desc: 'Your tech works 24/7. We handle the maintenance.'
                            },
                            {
                                icon: '🎯',
                                title: 'Crystal Clear',
                                desc: 'Reports and dashboards that make sense at a glance.'
                            },
                            {
                                icon: '📈',
                                title: 'Growth Ready',
                                desc: 'Systems built to scale with your business.'
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: '#fff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    padding: '32px 24px',
                                    textAlign: 'center'
                                }}
                            >
                                <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                                    {item.icon}
                                </div>
                                <h3
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: 600,
                                        margin: '0 0 12px 0'
                                    }}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: '16px',
                                        color: '#64748b',
                                        margin: 0
                                    }}
                                >
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section
                style={{
                    background: '#fff',
                    padding: '80px 24px',
                    borderTop: '1px solid #e2e8f0'
                }}
            >
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <h2
                        style={{
                            fontSize: '42px',
                            fontWeight: 700,
                            margin: '0 0 48px 0'
                        }}
                    >
                        Trusted by Local Heroes.
                    </h2>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '40px',
                            alignItems: 'center'
                        }}
                    >
                        {[
                            'TechFlow Inc.',
                            'Digital Dynamics',
                            'CloudBase Solutions',
                            'Swift Systems',
                            'ProTech Group',
                            'NextGen Co.'
                        ].map((company, idx) => (
                            <div
                                key={idx}
                                style={{
                                    padding: '24px',
                                    background: '#f1f5f9',
                                    borderRadius: '8px',
                                    color: '#64748b',
                                    fontWeight: 600,
                                    fontSize: '16px'
                                }}
                            >
                                {company}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                style={{
                    background: 'linear-gradient(135deg, #0d7ff2 0%, #0f184c 100%)',
                    color: '#fff',
                    padding: '80px 24px',
                    textAlign: 'center'
                }}
            >
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h2
                        style={{
                            fontSize: '48px',
                            fontWeight: 700,
                            margin: '0 0 24px 0'
                        }}
                    >
                        Ready to Fix Your Digital Leaks?
                    </h2>
                    <p
                        style={{
                            fontSize: '18px',
                            margin: '0 0 40px 0',
                            opacity: 0.95
                        }}
                    >
                        Get a free tech audit and see exactly where you&apos;re losing time and money.
                    </p>

                    <button
                        style={{
                            background: '#fff',
                            color: '#0d7ff2',
                            border: 'none',
                            padding: '16px 48px',
                            fontSize: '18px',
                            fontWeight: 600,
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        Get Your Free Tech Audit →
                    </button>

                    <p
                        style={{
                            fontSize: '14px',
                            color: 'rgba(255, 255, 255, 0.7)',
                            margin: '24px 0 0 0'
                        }}
                    >
                        ✓ No credit card needed • 15 minute discovery call • Customized to your business
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer
                style={{
                    background: '#0f1419',
                    color: '#94a3b8',
                    padding: '48px 24px',
                    textAlign: 'center',
                    borderTop: '1px solid #1e293b'
                }}
            >
                <p style={{ margin: 0, fontSize: '14px' }}>
                    © 2024 Vantus Systems. Making tech simple for businesses everywhere.
                </p>
            </footer>
        </div>
    );
};
