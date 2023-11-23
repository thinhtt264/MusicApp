import RNFS from 'react-native-fs';
import { isFirebaseUrl } from '../helper';
import { uploadFileToFirebase } from '../firebase';
import { TrackDataFields } from 'src/models/Track';

const musicAppFolderPath = `${RNFS.DownloadDirectoryPath}`;


const createDirectoryIfNotExists = async (directoryPath: string) => {
  try {
    const isExists = await RNFS.exists(directoryPath);
    if (!isExists) {
      await RNFS.mkdir(directoryPath);
      console.log(`Created directory: ${directoryPath}`);
    }
  } catch (error) {
    console.error('Error creating directory:', error);
  }
};

export const downloadTrack = async (data: TrackDataFields) => {

  const localFilePath = `${musicAppFolderPath}/LoveList/${data.id}.mp3`;

  const fileExists = await RNFS.exists(localFilePath);

  if (fileExists) {
    return `file://${localFilePath}`;
  }

  await createDirectoryIfNotExists(`${musicAppFolderPath}/LoveList`); //tạo thư mục tên playlist

  try {
    if (!data.url || isFirebaseUrl(data.url) || data.url === '') return '';

    const response: any = await RNFS.downloadFile({
      fromUrl: data.url,
      toFile: localFilePath,
      progress: res => {},
    }).promise;

    if (response.statusCode === 202) {
      setTimeout(() => {
        downloadTrack(data);
      }, 1000);
      return;
    }

    if (response.statusCode === 200) {
      console.log('Tải và lưu tệp tin thành công');
      if (fileExists) {
        // await uploadFileToFirebase({ localFilePath: localFilePath, data });
        // unLinkFileMp3();
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

const unLinkFileMp3 = () => {
  const localFilePath = `${RNFS.DocumentDirectoryPath}/myMusic.mp3`;
  setTimeout(async () => {
    try {
      await RNFS.unlink(localFilePath);
      console.log('Xóa tệp thành công');
    } catch (error) {
      console.error('Lỗi khi xóa tệp', error);
    }
  }, 500);
};
