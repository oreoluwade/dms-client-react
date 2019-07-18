export default (docs, type, user) => {
  let filtered;
  switch (type) {
    case 'PUBLIC':
      filtered = docs.filter(doc => doc.access === type);
      break;

    case 'PRIVATE':
      filtered = docs.filter(
        doc => doc.access === type && user.id === doc.owner.id
      );
      break;

    case 'ROLE':
      filtered = docs.filter(
        doc => doc.access === 'ROLE' && user.role === doc.owner.role
      );
      break;

    default:
      filtered = docs;
      break;
  }
  return filtered;
};
