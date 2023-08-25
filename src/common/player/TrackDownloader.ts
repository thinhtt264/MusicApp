import RNFS from 'react-native-fs';

const downloadTrack = async (url: string) => {
  const downloadUrl =
    'https://d.spotify-downloader.com/download/y576-ONm5II/&pp=ygUQWcOqdSA1IFJoeW1hc3RpYw%3D%3D';
  const localFilePath = `${RNFS.DocumentDirectoryPath}/myMusic.mp3`;

  try {
    const response: any = await RNFS.downloadFile({
      fromUrl: downloadUrl,
      toFile: localFilePath,
      progress: res => {
        console.log(res);
      },
    }).promise;

    console.log(response);

    if (response.statusCode === 200) {
      console.log('Tải và lưu tệp tin thành công');
      await start();
      setTimeout(async () => {
        try {
          await RNFS.unlink(`${RNFS.DocumentDirectoryPath}/myMusic.mp3`);
          console.log('Xóa tệp thành công');
        } catch (error) {
          console.error('Lỗi khi xóa tệp', error);
        }
      }, 3000);
    } else {
      console.error('Lỗi khi tải tệp tin');
    }
  } catch (error) {
    console.error('Lỗi khi tải tệp tin', error);
  }
};