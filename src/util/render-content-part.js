import stripHtmlTags from './stripHtmlTags';

export default content => {
  const normalizedText = stripHtmlTags(content);
  return normalizedText && normalizedText.length > 50
    ? `${normalizedText.slice(0, 40)}...`
    : normalizedText;
};
