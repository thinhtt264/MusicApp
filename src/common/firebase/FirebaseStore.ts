import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { ReadDataProps, WriteDataProps } from './type';

export const getTrackInfo = async ({
  collection = 'TrackList',
  doc,
}: ReadDataProps): Promise<
  FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
> => {
  return await firestore().collection(collection).doc(doc).get();
};

export const setTrackInfo = async ({
  collection = 'TrackList',
  data,
}: WriteDataProps) => {
  await firestore()
    .collection(collection)
    .doc(data.id)
    .set(data)
    .then(() => {
      console.log('Track added');
    });
};
