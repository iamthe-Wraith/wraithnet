export enum FileSizeLabel {
  B,
  KB,
  MB,
  GB,
}

export const getFileSize = (bytes: number, label: FileSizeLabel) => {
  let val = bytes;

  if (label === FileSizeLabel.KB) {
    val = bytes / 1000;
  } else if (label === FileSizeLabel.MB) {
    val = bytes / (1000 * 1000);
  } else {
    val = bytes / (1000 * 1000 * 1000);
  }

  return Math.round(val * 100) / 100;
};

export const roundFileSize = (bytes: number) => {
  if (bytes < 1000) {
    return `${getFileSize(bytes, FileSizeLabel.B)} B`;
  } else if (bytes < (1000 * 1000)) {
    return `${getFileSize(bytes, FileSizeLabel.KB)} KB`;
  } else if (bytes < (1000 * 1000 * 1000)) {
    return `${getFileSize(bytes, FileSizeLabel.MB)} MB`;
  } else {
    return `${getFileSize(bytes, FileSizeLabel.GB)} GB`;
  }
};