const BlockInvalidInputChar = (e: any) => {
  ["e", "E", "-", "+"].includes(e.key) && e.preventDefault();
};

export default BlockInvalidInputChar;
