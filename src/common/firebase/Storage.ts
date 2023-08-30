import storage from '@react-native-firebase/storage';
import { TrackInfoFields, UploadFileFields } from './type';
import { setTrackInfo } from './FirebaseStore';
import { getCurrentTimestamp } from '../helper';

export const uploadFileToFirebase = async ({
  localFilePath,
  data,
}: UploadFileFields) => {
  const path = `/TrackFile/${getCurrentTimestamp()}'_'${data.title}`;
  const reference = storage().ref(path);

  try {
    await reference.putFile(localFilePath).then(async () => {
      handleDoneUpload(path, data);
    });

    console.log('Tệp đã được tải lên thành công.');
  } catch (error) {
    console.error('Lỗi khi tải tệp lên Firebase Storage:', error);
  }
};

const handleDoneUpload = async (path: string, trackInfo: TrackInfoFields) => {
  const url = await storage().ref(path).getDownloadURL();
  await setTrackInfo({
    data: { ...trackInfo, url: url },
  });
};
