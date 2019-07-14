export default content => {
  return content.replace(/<\/?\w+>/g, '');
};
