/* eslint-disable no-unused-vars */
const getFilesByProcessID = async (payload) => {
  const {
 ProcessId, pageNumber = 1, pageSize = 100, isValid
} = payload;
  //   await base('get', `v1/files/importedFiles/${ProcessId}`, null, {
  //     pageNumber,
  //     pageSize,
  //     isValid,
  //   });
  return {};
};
const approveImportedFile = async (payload) => {
  const { ProcessId } = payload;
  //   await base('post', `v1/files/approveImportedFile/${ProcessId}`, null, {});
  return {};
};

export { getFilesByProcessID, approveImportedFile };
