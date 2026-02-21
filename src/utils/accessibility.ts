/**
 * Get the background color class for accessibility score icons
 * Based on the AXS Map scoring system (per-category scores 0-5):
 * - Red: Score 1 (Not accessible)
 * - Yellow: Score 2-3 (Partially accessible)
 * - Green: Score 4+ (Accessible)
 * - Grey: Score 0 or undefined (Not rated)
 *
 * Matches the Card component and mobile app color logic.
 */
export const getScoreColor = (score: number | undefined): string => {
  if (score === undefined || score === null || score === 0) {
    return 'bg-gray-400'; // Not rated
  }
  if (score === 1) {
    return 'bg-[#FF5602]'; // Not accessible (red/orange)
  }
  if (score >= 2 && score <= 3) {
    return 'bg-[#FEE000]'; // Partially accessible (yellow)
  }
  if (score >= 4) {
    return 'bg-[#009A01]'; // Accessible (green)
  }
  return 'bg-gray-400'; // Default
};

/**
 * Get the label for accessibility score
 */
export const getScoreLabel = (score: number | undefined): string => {
  if (score === undefined || score === null || score === 0) {
    return 'Not Rated';
  }
  if (score === 1) {
    return 'Not Accessible';
  }
  if (score >= 2 && score <= 3) {
    return 'Partially Accessible';
  }
  if (score >= 4) {
    return 'Accessible';
  }
  return 'Not Rated';
};

/**
 * Get the icon tint/text color class for accessibility score icons.
 * Yellow backgrounds need dark text for contrast; others use white.
 */
export const getScoreIconTint = (score: number | undefined): string => {
  if (score !== undefined && score !== null && score >= 2 && score <= 3) {
    return 'text-gray-900'; // Dark text on yellow background
  }
  return 'text-white'; // White text on green, red, or grey
};
