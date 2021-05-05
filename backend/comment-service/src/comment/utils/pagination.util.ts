export const getCursor = (entity: { id: string | number }): string => {
  const data = JSON.stringify(entity);
  return new Buffer(data).toString('base64');
};
