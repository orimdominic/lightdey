const getLocationString = ({ state, area, street }) => {
  return `${state.toLowerCase()}/${area
    .toLowerCase()
    .replaceAll('/', ' ')
    .replace(' ', '-')}/${street
    .toLowerCase()
    .replaceAll('/', ' ')
    .replaceAll(' ', '-')}`;
};

const sortTimeDesc = (u1, u2) => {
  if (u1.updatedOn < u2.updatedOn) {
    return 1;
  } else if (u1.updatedOn > u2.updatedOn) {
    return -1;
  }
  return 0;
};

const sortNameAsc = (param1, param2) => {
  if (param1.name > param2.name) {
    return 1;
  } else if (param2.name > param1.name) {
    return -1;
  }
  return 0;
};

const updatesToUi = (updates, sortTimeDesc, updateStatusMap) => {
  return [
    ...Object.values(updates)
      .sort(sortTimeDesc)
      .map((update) => {
        return {
          ...update,
          updatedOnText: update.updatedOn, // get time is about x time ago
          statusText: updateStatusMap.get(update.status),
          // get status as status-n // for class name
        };
      }),
  ];
};

export { getLocationString, updatesToUi, sortTimeDesc, sortNameAsc };
