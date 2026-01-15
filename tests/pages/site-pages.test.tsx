import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/(site)/about/page';
import PerformancePage from '@/app/(site)/performance/page';
import ProcessPage from '@/app/(site)/process/page';
import ServicesPage from '@/app/(site)/services/page';
import TrustCenterPage from '@/app/(site)/trust/page';

// Mock Reveal component
vi.mock('@/components/reveal', () => ({
  Reveal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock Link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock other components
vi.mock('@/components/vt-link', () => ({
  VTLink: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/components/execution-protocol', () => ({
  ExecutionProtocol: () => <div data-testid="execution-protocol">Execution Protocol</div>,
}));

vi.mock('@/components/calibration-headline', () => ({
  CalibrationHeadline: ({ text }: { text: string }) => <span>{text}</span>,
}));

// Mock Icons
vi.mock('lucide-react', () => {
  const IconMock = () => <span>IconMock</span>;
  return {
    ArrowRight: IconMock,
    BookOpen: IconMock,
    Calculator: IconMock,
    Server: IconMock,
    Code: IconMock,
    Layers: IconMock,
    ShieldCheck: IconMock,
    Database: IconMock,
    Shield: IconMock,
    CheckCircle: IconMock,
    AlertTriangle: IconMock,
    Lock: IconMock,
    FileText: IconMock,
    Zap: IconMock,
    Users: IconMock,
    Box: IconMock,
    Scale: IconMock,
    Globe: IconMock,
    Search: IconMock,
    X: IconMock,
    Hammer: IconMock,
    Check: IconMock,
    Key: IconMock,
  };
});

describe('Site Pages', () => {
  describe('AboutPage', () => {
    it('should render about page content', () => {
      render(<AboutPage />);
      expect(screen.getByText(/Not a generic agency/i)).toBeInTheDocument();
      expect(screen.getByText(/A dedicated engineering partner/i)).toBeInTheDocument();
    });
  });

  describe('PerformancePage', () => {
    it('should render performance page content', () => {
      render(<PerformancePage />);
      expect(screen.getByText(/Speed is a Feature/i)).toBeInTheDocument();
      expect(screen.getByText(/Edge Delivery/i)).toBeInTheDocument();
      expect(screen.getByText(/Database Integrity/i)).toBeInTheDocument();
      expect(screen.getByText(/Auto-Scaling/i)).toBeInTheDocument();
    });
  });

  describe('ProcessPage', () => {
    it('should render process page content', () => {
      render(<ProcessPage />);
      expect(screen.getByText(/EXECUTION_PROTOCOL/i)).toBeInTheDocument();
      expect(screen.getByTestId('execution-protocol')).toBeInTheDocument();
    });
  });

  describe('ServicesPage', () => {
    it('should render services page content', () => {
      render(<ServicesPage />);
      expect(screen.getByText(/Services & Packages/i)).toBeInTheDocument();
      expect(screen.getByText(/The Business OS/i)).toBeInTheDocument();
      expect(screen.getByText(/Audit & Rescue/i)).toBeInTheDocument();
    });
  });

  describe('TrustCenterPage', () => {
    it('should render trust center page content', () => {
      render(<TrustCenterPage />);
      expect(screen.getByText(/Trust Center/i)).toBeInTheDocument();
      expect(screen.getByText(/What You Own/i)).toBeInTheDocument();
      expect(screen.getByText(/Zero Vendor Lock-in/i)).toBeInTheDocument();
    });
  });
});
