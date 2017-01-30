import isEqual from 'lodash.isequal';

/* It iterates through each deep nested object and if finds object that has prop and value specified in objToFindBy
argument, it deletes it, stops the walk and returns the whole tree.
If none is found, it returns false. */

const findAndDeleteFirst = function (tree, childrenKey, objToFindBy) {
  let treeModified = false;
  const findKeys = Object.keys(objToFindBy);
  let findSuccess = false;
  findKeys.forEach((key) => {
    isEqual(tree[key], objToFindBy[key]) ? findSuccess = true : findSuccess = false;
  });
  if (findSuccess) {
    Object.keys(tree).forEach((key) => delete tree[key]);
    return tree;
  }
  function innerFunc(tree, childrenKey, objToFindBy) {
    if (tree[childrenKey]) {
      for (let index = 0; index < tree[childrenKey].length; index++) {
        const findKeys = Object.keys(objToFindBy);
        let findSuccess = false;
        findKeys.forEach((key) => {
          isEqual(tree[childrenKey][index][key], objToFindBy[key]) ? findSuccess = true : findSuccess = false;
        });
        if (findSuccess) {
          tree[childrenKey].splice(index, 1);
          treeModified = true;
          break;
        } else if (tree[childrenKey][index].hasOwnProperty(childrenKey)) {
          innerFunc(tree[childrenKey][index], childrenKey, objToFindBy);
        }
      }

    }
  }
  innerFunc(tree, childrenKey, objToFindBy);
  if (!treeModified) {
    return false;
  }
  return tree;
};

export default findAndDeleteFirst;
