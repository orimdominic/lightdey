const getPath = ({ state, area, street }) => {
  return `${state.toLowerCase()}/${area
    .toLowerCase()
    .replace('/', ' ')
    .replace(' ', '-')}/${street
    .toLowerCase()
    .replace('/', ' ')
    .replace(' ', '-')}`;
};

export { getPath };
