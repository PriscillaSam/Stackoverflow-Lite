import moment from 'moment';

/**
 * Formats time displyed on UI templates
 * @param {element} time DateTime as string
 * @returns {string} Formatted time
 */
export default (time) => {
  const formatted = Date.parse(time);
  const now = new Date(formatted);

  const difference = Math.floor((new Date() - now) / 1000);

  if (difference < 60) {
    return difference === 1
      ? `${difference} second ago` : `${difference} seconds ago`;
  }
  if (difference >= 60 && difference <= 3599) {
    const minutes = Math.floor(difference / 60);
    return minutes === 1
      ? `${minutes} minute ago` : `${minutes} minutes ago`;
  }

  if (difference >= 3600 && difference <= 86400) {
    const hours = Math.floor(difference / 3600);

    return hours === 1
      ? `${hours} hour ago` : `${hours} hours ago`;
  }
  return moment(time).format('lll');
};
