/**
 * Sanitizes user input to prevent NoSQL injection attacks
 * @param {string} input - User input string
 * @returns {string} Sanitized string with escaped regex special characters
 */
function escapeRegex(input) {
  // Escape special regex characters to prevent NoSQL injection and ReDoS attacks
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = {
  escapeRegex
};
