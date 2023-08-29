import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';
import { TrackInfoFields, UploadFileFields } from './type';
import { getCurrentTimestamp } from '../helper/method/Type';
import { setTrackInfo } from './FirebaseStore';

export const uploadFileToFirebase = ({
  localFilePath,
  data,
}: UploadFileFields) => {
  const reference = storage().ref(
    `/TrackFile/${getCurrentTimestamp()}'_'${data.title}`,
  );

  try {
    reference.putFile(localFilePath).then(snapshot => {
      handleDoneUpload(snapshot, data);
    });
    console.log('Tệp đã được tải lên thành công.');
  } catch (error) {
    console.error('Lỗi khi tải tệp lên Firebase Storage:', error);
  }
};

const handleDoneUpload = (
  uploadSnapshot: FirebaseStorageTypes.TaskSnapshot,
  trackInfo: TrackInfoFields,
) => {
  uploadSnapshot.ref.getDownloadURL().then(downloadURL => {
    setTrackInfo({
      data: { ...trackInfo, url: downloadURL },
      doc: trackInfo.id,
    });
  });
};
