'use client';

import React, { Suspense } from 'react';
import { ArrowRight, Zap, Shield, TrendingUp, Users } from 'lucide-react';

const RemotionHeroWrapper = React.lazy(() =>
    import('@/components/remotion/RemotionDemo').then(mod => ({ default: () => <mod.RemotionDemo compositionId="hero" /> }))
);

const RemotionDataWrapper = React.lazy(() =>
    import('@/components/remotion/RemotionDemo').then(mod => ({ default: () => <mod.RemotionDemo compositionId="data" /> }))
);

export default function VantusHomepage() {
    return (
        <div style={{ background: '#fff', fontFamily: 'inherit' }}>
            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, #0d7ff2 0%, #0f184c 100%)',
                color: '#fff',
                padding: '80px 24px',
                minHeight: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                    pointerEvents: 'none'
                }} />

                <div style={{ maxWidth: '800px', position: 'relative', zIndex: 2 }}>
                    <h1 style={{
                        fontSize: '56px',
                        fontWeight: 700,
                        margin: '0 0 24px 0',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2
                    }}>
                        We Make Tech Simple.
                    </h1>
                    <p style={{
                        fontSize: '18px',
                        lineHeight: 1.6,
                        margin: '0 0 40px 0',
                        opacity: 0.95,
                        fontWeight: 400
                    }}>
                        Running a business is hard. Your tech shouldn{`'`}t be. We fix your digital leaks and help you grow without the headache.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
                        <span style={{
                            display: 'inline-block',
                            background: 'rgba(255, 255, 255, 0.2)',
                            padding: '10px 16px',
                            borderRadius: '24px',
                            fontSize: '14px',
                            fontWeight: 600,
                            backdropFilter: 'blur(10px)'
                        }}>
                            ⚡ High-Speed Results
                        </span>
                        <span style={{
                            display: 'inline-block',
                            background: 'rgba(255, 255, 255, 0.2)',
                            padding: '10px 16px',
                            borderRadius: '24px',
                            fontSize: '14px',
                            fontWeight: 600,
                            backdropFilter: 'blur(10px)'
                        }}>
                            ✨ Unique Experiences
                        </span>
                    </div>

                    <button style={{
                        background: '#fff',
                        color: '#0d7ff2',
                        border: 'none',
                        padding: '14px 40px',
                        fontSize: '16px',
                        fontWeight: 600,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        Get Your Free Tech Audit <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            {/* Problem Section */}
            <section style={{
                background: '#1e293b',
                color: '#fff',
                padding: '80px 24px'
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{
                        fontSize: '48px',
                        fontWeight: 700,
                        margin: '0 0 16px 0'
                    }}>
                        Wasted Time Is Wasted Money.
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: '#cbd5e1',
                        margin: '0 0 48px 0'
                    }}>
                        These problems sound familiar?
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '24px'
                    }}>
                        {[
                            { icon: '🐌', title: 'Slow Websites', desc: 'Losing customers before they even say hello.' },
                            { icon: '⚠️', title: 'Tech Breaks Easy', desc: 'When it fails, your whole team scrambles.' },
                            { icon: '🤔', title: 'Confusing Jargon', desc: "Nobody explains what's happening. It's all confusing talk." }
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                padding: '32px 24px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '40px', marginBottom: '16px' }}>
                                    {item.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '20px',
                                    fontWeight: 600,
                                    margin: '0 0 12px 0'
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    fontSize: '16px',
                                    color: '#cbd5e1',
                                    margin: 0,
                                    lineHeight: 1.5
                                }}>
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dynamic Remotion Hero Animation */}
            <section style={{
                background: 'linear-gradient(180deg, #020617 0%, #0f1419 100%)',
                padding: '80px 24px',
                minHeight: '900px'
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '42px',
                        fontWeight: 700,
                        color: '#fff',
                        textAlign: 'center',
                        margin: '0 0 48px 0'
                    }}>
                        See Your Transformation
                    </h2>
                    <Suspense fallback={
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '2px solid rgba(59, 130, 246, 0.3)',
                            borderRadius: '16px',
                            height: '600px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#94a3b8'
                        }}>
                            <p>Loading experience...</p>
                        </div>
                    }>
                        <RemotionHeroWrapper />
                    </Suspense>
                </div>
            </section>

            {/* Solution Section */}
            <section style={{
                background: '#f8fafc',
                padding: '80px 24px'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '48px',
                        fontWeight: 700,
                        textAlign: 'center',
                        margin: '0 0 16px 0'
                    }}>
                        Your Business, Upgraded.
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: '#475569',
                        textAlign: 'center',
                        margin: '0 0 64px 0',
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        We take the complexity out. Here&apos;s what changes:
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '32px'
                    }}>
                        {[
                            { icon: Zap, title: 'Lightning Fast', desc: 'Websites that load in under 1 second. Your customers stay.' },
                            { icon: Shield, title: 'Always On', desc: 'Your tech works 24/7 - no more surprise downtime.' },
                            { icon: TrendingUp, title: 'Crystal Clear', desc: 'Reports and dashboards that make sense at a glance.' },
                            { icon: Users, title: 'Growth Ready', desc: 'Built to scale with your business from day one.' }
                        ].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div key={idx} style={{
                                    background: '#fff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    padding: '32px 24px',
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(13, 127, 242, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'linear-gradient(135deg, #0d7ff2 0%, #3b82f6 100%)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 16px'
                                    }}>
                                        <Icon size={24} color="#fff" />
                                    </div>
                                    <h3 style={{
                                        fontSize: '20px',
                                        fontWeight: 600,
                                        margin: '0 0 12px 0'
                                    }}>
                                        {item.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '16px',
                                        color: '#64748b',
                                        margin: 0,
                                        lineHeight: 1.6
                                    }}>
                                        {item.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Data Animation Section */}
            <section style={{
                background: 'linear-gradient(180deg, #020617 0%, #0f1419 100%)',
                padding: '80px 24px',
                minHeight: '900px'
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '42px',
                        fontWeight: 700,
                        color: '#fff',
                        textAlign: 'center',
                        margin: '0 0 48px 0'
                    }}>
                        Real Results That Matter
                    </h2>
                    <Suspense fallback={
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '2px solid rgba(59, 130, 246, 0.3)',
                            borderRadius: '16px',
                            height: '600px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#94a3b8'
                        }}>
                            <p>Loading metrics...</p>
                        </div>
                    }>
                        <RemotionDataWrapper />
                    </Suspense>
                </div>
            </section>

            {/* Social Proof Section */}
            <section style={{
                background: '#fff',
                padding: '80px 24px',
                borderTop: '1px solid #e2e8f0'
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{
                        fontSize: '42px',
                        fontWeight: 700,
                        margin: '0 0 48px 0'
                    }}>
                        Trusted by Local Heroes.
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '32px'
                    }}>
                        {[
                            'TechFlow Inc.',
                            'Digital Dynamics',
                            'CloudBase Solutions',
                            'Swift Systems',
                            'ProTech Group',
                            'NextGen Co.'
                        ].map((company, idx) => (
                            <div key={idx} style={{
                                padding: '28px 24px',
                                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                color: '#64748b',
                                fontWeight: 600,
                                fontSize: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '80px'
                            }}>
                                {company}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section style={{
                background: '#f8fafc',
                padding: '80px 24px',
                borderTop: '1px solid #e2e8f0'
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '48px',
                        fontWeight: 700,
                        textAlign: 'center',
                        margin: '0 0 64px 0'
                    }}>
                        How It Works
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '24px'
                    }}>
                        {[
                            { num: '1', title: 'Discovery Call', desc: '15 minutes to understand your business and pain points.' },
                            { num: '2', title: 'Free Tech Audit', desc: 'We analyze everything. You get a customized report.' },
                            { num: '3', title: 'Clear Plan', desc: 'No surprises - just a straightforward roadmap.' },
                            { num: '4', title: 'We Build', desc: 'Fast, secure, and built to last.' }
                        ].map((step, idx) => (
                            <div key={idx} style={{
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    background: 'linear-gradient(135deg, #0d7ff2 0%, #3b82f6 100%)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    fontSize: '24px',
                                    fontWeight: 700,
                                    margin: '0 auto 16px'
                                }}>
                                    {step.num}
                                </div>
                                <h3 style={{
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    margin: '0 0 12px 0'
                                }}>
                                    {step.title}
                                </h3>
                                <p style={{
                                    fontSize: '16px',
                                    color: '#64748b',
                                    margin: 0,
                                    lineHeight: 1.5
                                }}>
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section style={{
                background: 'linear-gradient(135deg, #0d7ff2 0%, #0f184c 100%)',
                color: '#fff',
                padding: '80px 24px',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '48px',
                        fontWeight: 700,
                        margin: '0 0 24px 0'
                    }}>
                        Ready to Fix Your Digital Leaks?
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        margin: '0 0 40px 0',
                        opacity: 0.95,
                        lineHeight: 1.6
                    }}>
                        Get a free tech audit and see exactly where you&apos;re losing time and money. No credit card needed.
                    </p>

                    <button style={{
                        background: '#fff',
                        color: '#0d7ff2',
                        border: 'none',
                        padding: '16px 48px',
                        fontSize: '18px',
                        fontWeight: 600,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        Schedule Your Free Audit <ArrowRight size={18} />
                    </button>

                    <p style={{
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        margin: '24px 0 0 0'
                    }}>
                        ✓ No credit card needed • 15 minute discovery call • Customized to your business
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                background: '#0f1419',
                color: '#94a3b8',
                padding: '48px 24px',
                textAlign: 'center',
                borderTop: '1px solid #1e293b'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '32px',
                        marginBottom: '32px',
                        textAlign: 'left'
                    }}>
                        <div>
                            <h3 style={{
                                color: '#fff',
                                fontWeight: 600,
                                marginBottom: '12px',
                                fontSize: '16px'
                            }}>
                                Product
                            </h3>
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                <li><a href="/services" style={{ color: '#94a3b8', textDecoration: 'none' }}>Features</a></li>
                                <li><a href="/pricing" style={{ color: '#94a3b8', textDecoration: 'none' }}>Pricing</a></li>
                                <li><a href="/trust" style={{ color: '#94a3b8', textDecoration: 'none' }}>Security</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 style={{
                                color: '#fff',
                                fontWeight: 600,
                                marginBottom: '12px',
                                fontSize: '16px'
                            }}>
                                Company
                            </h3>
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                <li><a href="/about" style={{ color: '#94a3b8', textDecoration: 'none' }}>About</a></li>
                                <li><a href="/insights" style={{ color: '#94a3b8', textDecoration: 'none' }}>Blog</a></li>
                                <li><a href="/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 style={{
                                color: '#fff',
                                fontWeight: 600,
                                marginBottom: '12px',
                                fontSize: '16px'
                            }}>
                                Legal
                            </h3>
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                <li><a href="/terms" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy</a></li>
                                <li><a href="/terms" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms</a></li>
                                <li><a href="/terms" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cookies</a></li>
                            </ul>
                        </div>
                    </div>
                    <div style={{
                        borderTop: '1px solid #1e293b',
                        paddingTop: '24px',
                        textAlign: 'center'
                    }}>
                        <p style={{ margin: 0, fontSize: '14px' }}>
                            © 2024 Vantus Systems. Making tech simple for businesses everywhere.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
