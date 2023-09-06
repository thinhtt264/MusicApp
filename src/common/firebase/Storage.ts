import storage from '@react-native-firebase/storage';
import { UploadFileFields } from './type';
import { setTrackInfo } from './FirebaseStore';
import { getCurrentTimestamp } from '../helper';

export const uploadFileToFirebase = async ({
  localFilePath,
  data,
}: UploadFileFields) => {
  const path = `/TrackFile/${getCurrentTimestamp()}'_'${data.name}`;
  const reference = storage().ref(path);

  try {
    await reference.putFile(localFilePath).then(async () => {
      handleDoneUpload({ localFilePath: path, data });
    });

    console.log('Tệp đã được tải lên thành công.');
  } catch (error) {
    console.error('Lỗi khi tải tệp lên Firebase Storage:', error);
  }
};

const handleDoneUpload = async ({ localFilePath, data }: UploadFileFields) => {
  const url = await storage().ref(localFilePath).getDownloadURL();
  await setTrackInfo({
    data: { ...data, url: url },
    doc: data.id,
  });
};
