/**
 * Get the background color class for accessibility score icons
 * Based on the AXS Map scoring system:
 * - Red: Score 1-2 (Inaccessible)
 * - Yellow: Score 3-4 (Partially accessible)
 * - Green: Score 5+ (Accessible)
 * - Grey: Score 0 or undefined (Not rated)
 */
export const getScoreColor = (score: number | undefined): string => {
  if (score === undefined || score === null || score === 0) {
    return 'bg-gray-300'; // Not rated
  }
  if (score >= 1 && score < 3) {
    return 'bg-red-500'; // Inaccessible
  }
  if (score >= 3 && score < 5) {
    return 'bg-yellow-400'; // Partially accessible
  }
  if (score >= 5) {
    return 'bg-green-500'; // Accessible
  }
  return 'bg-gray-300'; // Default
};

/**
 * Get the label for accessibility score
 */
export const getScoreLabel = (score: number | undefined): string => {
  if (score === undefined || score === null || score === 0) {
    return 'Not Rated';
  }
  if (score >= 1 && score < 3) {
    return 'Inaccessible';
  }
  if (score >= 3 && score < 5) {
    return 'Partially Accessible';
  }
  if (score >= 5) {
    return 'Accessible';
  }
  return 'Not Rated';
};
