import RNFS from 'react-native-fs';
import { isFirebaseUrl } from '../helper';
import { uploadFileToFirebase } from '../firebase';
import { TrackDataFields } from 'src/models/Search';

export const downloadTrack = async (data: TrackDataFields) => {
  const localFilePath = `${RNFS.DocumentDirectoryPath}/myMusic.mp3`;
  if (isFirebaseUrl(data.url) || data.url === '') return '';
  try {
    console.log(data.url);
    
    const response: any = await RNFS.downloadFile({
      fromUrl: data.url,
      toFile: localFilePath,
      progress: res => {},
    }).promise;

    console.log(response);

    if (response.statusCode === 200) {
      console.log('Tải và lưu tệp tin thành công');
      const fileExists = await RNFS.exists(localFilePath);
      if (fileExists) {
        uploadFileToFirebase({ localFilePath: localFilePath, data });
        return localFilePath;
      }
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

// export const unLinkFileMp3 = () => {
//   const localFilePath = `${RNFS.DocumentDirectoryPath}/myMusic.mp3`;
//   setTimeout(async () => {
//     try {
//       await RNFS.unlink(localFilePath);
//       console.log('Xóa tệp thành công');
//     } catch (error) {
//       console.error('Lỗi khi xóa tệp', error);
//     }
//   }, 500);
// };
