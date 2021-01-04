const updateOpts = new Map()
  .set(0, 'Down NEPA')
  .set(1, 'Low current')
  .set(2, 'Up NEPA');

const getPath = ({ state, area, street }) => {
  return `${state.toLowerCase()}/${area
    .toLowerCase()
    .replaceAll('/', ' ')
    .replace(' ', '-')}/${street
    .toLowerCase()
    .replaceAll('/', ' ')
    .replaceAll(' ', '-')}`;
};

const toArray = (obj) => {
  return Object.values(obj);
};

const sortTimeDesc = (u1, u2) => {
  if (u1.updatedOn < u2.updatedOn) {
    return 1;
  } else if (u1.updatedOn > u2.updatedOn) {
    return -1;
  }
  return 0;
};

const updatesToUi = (updates) => {
  return [
    ...toArray(updates)
      .sort(sortTimeDesc)
      .map((update) => {
        return {
          ...update,
          updatedOnText: update.updatedOn, // get time is about x time ago
          statusText: updateOpts.get(update.status),
          // get status as status-n // for class name
        };
      }),
  ];
};

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

export { getPath, updatesToUi, updateOpts, getRandomNumber };
