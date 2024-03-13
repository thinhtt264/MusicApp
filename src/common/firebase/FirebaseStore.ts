import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {
  AddPlayListFields,
  AddTrackToPlayListFields,
  ReadDataProps,
  WriteDataProps,
} from './type';
import { Collection } from './Constants';
import { useEffect } from 'react';

const UserId = 'user1';
export const PlayListDocRef = firestore()
  .collection(Collection.PlayList)
  .doc(UserId);

const PlayListCollectionRef = firestore()
  .doc(PlayListDocRef.path)
  .collection(Collection.PlayList_List);

export const getTrackInfo = async ({
  doc,
}: ReadDataProps): Promise<
  FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
> => {
  return await firestore().collection(Collection.TrackList).doc(doc).get();
};

export const setTrackInfo = async ({ doc, data }: WriteDataProps) => {
  await firestore()
    .collection(Collection.TrackList)
    .doc(doc)
    .set(data)
    .then(() => {
      console.log('Track added');
    });
};

export const getRapidApiKey = async ({
  collection = Collection.RapidApi,
  doc = 'RapidKey',
}) => {
  return await firestore().collection(collection).doc(doc).get();
};

export const getPlaylist = async () => {
  return await PlayListCollectionRef.get().then(data =>
    data.docs.map(t => t.data()),
  );
};

export const useTrackFromPlayList = async (
  playlistId: string,
  setData?: (data: any) => void,
) => {
  useEffect(() => {
    const subscriber = PlayListDocRef.collection(playlistId).onSnapshot(
      documentSnapshot => {
        let data: FirebaseFirestoreTypes.DocumentData[] = [];
        documentSnapshot.docs.map(t => data.push(t.data()));
        const totalItems = documentSnapshot.size;

        setData?.({ data, totalItems });
      },
    );
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkExistsDoc = async ({ docRef, colRef }: any) => {
  if (docRef) {
    const docSnapshot = await firestore().doc(docRef).get();
    return !!docSnapshot.exists ?? false;
  }
};

export const useCheckLoveTrack = async (
  dataId?: string,
  setData?: (data: any) => void,
) => {
  useEffect(() => {
    let isMounted = true;
    let unsubscribe: () => void;

    const fetchData = async () => {
      if (!dataId || typeof setData !== 'function') return;

      unsubscribe?.();

      const docRef = firestore().doc(`PlayLists/${UserId}/LoveList/${dataId}`);

      unsubscribe = docRef.onSnapshot(documentSnapshot => {
        if (isMounted) {
          setData?.(documentSnapshot.exists);
        }
      });
    };

    fetchData();

    return () => {
      isMounted = false;
      unsubscribe?.();
    };
  }, [dataId, setData, UserId]);

  return false;
};

export const addTrackToPlaylist = ({
  data,
  ref = `PlayLists/${UserId}/LoveList`, // mặc định add vào love list
  callback = () => {},
}: AddTrackToPlayListFields) => {
  const playlistId = ref.split('/')[2];
  const docRef = firestore().collection(ref).doc(data.id);

  checkExistsDoc(docRef.path).then(bool => {
    if (!bool) {
      docRef.set(data).then(() => {
        console.log('add track to playlist');
        callback();
        //tăng 1 total khi add track vào playlist
        PlayListCollectionRef.doc(playlistId)
          .update({
            total: firestore.FieldValue.increment(1),
          })
          .then(() => {
            console.log('update total');
          });
      });
    } else {
      console.log('Document already exists');
    }
  });
};

export const removeTrackFromPlaylist = ({
  data,
  ref = `PlayLists/${UserId}/LoveList`, // mặc định love list
  callback = () => {},
}: AddTrackToPlayListFields) => {
  const playlistId = ref.split('/')[2];
  const docRef = firestore().collection(ref).doc(data.id);

  docRef
    .delete()
    .then(() => {
      callback();
      PlayListCollectionRef.doc(playlistId)
        .update({
          total: firestore.FieldValue.increment(-1), //giảm 1 total sau khi xóa
        })
        .then(() => {
          console.log('update total');
        });
    })
    .catch(e => {
      console.log('lỗi khi xóa track');
      console.log(e);
    });
};

export const addPlaylist = ({
  data,
  playListId = (Date.now() + Math.floor(Math.random() * 10000)).toString(),
}: AddPlayListFields) => {
  const trackListRef = PlayListDocRef.collection(playListId);

  PlayListCollectionRef.doc(playListId)
    .set({
      ...data,
      id: playListId,
      listTrackRef: trackListRef.path,
      total: 0,
    })
    .then(() => {
      console.log('add Playlist thành công');
    });
};
