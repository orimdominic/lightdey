/**
 * Returns the value gotten from converting `str` to
 * lowercase and replacing all spaces with '-'
 * @param {string} str the string value to convert
 */
const stringToId = (str) => {
  return str.toLowerCase().replace(' ', '-');
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
          statusText: updateStatusMap.get(update.status),
        };
      }),
  ];
};

export {
  updatesToUi,
  sortTimeDesc,
  sortNameAsc,
  stringToId,
};
