const IPFS = require("ipfs");

module.exports.saveData = async (data) => {
  const node = await IPFS.create();
  await node.add({
    content: data,
  });
};
