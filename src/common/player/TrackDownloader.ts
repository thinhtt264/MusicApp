import RNFS from 'react-native-fs';

export const downloadTrack = async (downloadUrl: string) => {
  const localFilePath = `${RNFS.DocumentDirectoryPath}/myMusic.mp3`;
  if (downloadUrl === '') return localFilePath;
  try {
    const response: any = await RNFS.downloadFile({
      fromUrl: downloadUrl,
      toFile: localFilePath,
      progress: res => {},
    }).promise;

    if (response.statusCode === 200) {
      console.log('Tải và lưu tệp tin thành công');
      const fileExists = await RNFS.exists(localFilePath);
      if (fileExists)
        // setTimeout(async () => {
        //   try {
        //     await RNFS.unlink(localFilePath);
        //     console.log('Xóa tệp thành công');
        //   } catch (error) {
        //     console.error('Lỗi khi xóa tệp', error);
        //   }
        // }, 3000);
        return localFilePath;
      return '';
    } else {
      console.error('Lỗi khi tải tệp tin');
      return '';
    }
  } catch (error) {
    console.error('Lỗi khi tải tệp tin', error);
    return '';
  }
};
