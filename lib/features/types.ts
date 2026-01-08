/**
 * @fileoverview Feature Flags Type Definitions
 * @module lib/features/types
 * @version 1.0.0
 * 
 * Centralized feature flag management for A/B testing and feature gating
 */

export interface FeatureFlags {
  enableAdvancedRecommendations: boolean;
  enableGpuRecommendations: boolean;
  enableAlternativesView: boolean;
  
  // ✅ FIXED: Invalid property name (was enableA/BTesting)
  // Use camelCase for valid TypeScript identifiers
  enableABTesting?: boolean;
  
  // Alternative options:
  // enableA_BTesting?: boolean;  // Using underscore
  // enableAlphaBetaTesting?: boolean;  // Full name
}

/**
 * Feature flag context for React components
 */
export interface FeatureFlagContextType {
  flags: FeatureFlags;
  isReady: boolean;
  updateFlag: (key: keyof FeatureFlags, value: boolean) => void;
}

/**
 * Feature flag provider props
 */
export interface FeatureFlagProviderProps {
  children: React.ReactNode;
  initialFlags?: Partial<FeatureFlags>;
}

/**
 * Hook return type for useFeatureFlags
 */
export interface UseFeatureFlagsReturn {
  flags: FeatureFlags;
  isEnabled: (key: keyof FeatureFlags) => boolean;
  isReady: boolean;
}

/**
 * A/B testing variant mapping
 */
export interface ABTestVariant {
  name: string;
  weight: number;
  features: Partial<FeatureFlags>;
}

// Example feature flag defaults for development
export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  enableAdvancedRecommendations: false,
  enableGpuRecommendations: true,
  enableAlternativesView: true,
  enableABTesting: false,
};