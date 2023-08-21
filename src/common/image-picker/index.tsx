import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import React, { forwardRef, memo } from 'react';
import { ActionSheet } from 'src/components/acction-sheet/ActionSheet';
import equals from 'react-fast-compare';
import { AssetType } from 'src/models/Type';
import { fontScale } from '../scale';
import {
  Image as ImageType,
  openCamera,
  openPicker,
} from 'react-native-image-crop-picker';
interface ImagePickerProps {
  type?: 'image';
  onChange?: (data: AssetType) => void;
  cameraConfigs?: any;
}

const ImagePickerComponent = forwardRef<any, ImagePickerProps>(
  (props, refs) => {
    const {
      onChange,
      type,
      cameraConfigs = {
        width: 400,
        height: 400,
        cropping: true,
        mediaType: 'photo',
      },
    } = props;

    const chooseOption = (index: number) => {
      switch (index) {
        case 0:
          onLaunchCamera();
          break;
        case 1:
          onLaunchImageLibrary();
          break;
        default:
          break;
      }
    };

    const onLaunchCamera = async () => {
      try {
        setTimeout(async () => {
          try {
            const image: any = await openCamera(cameraConfigs);
            handleImagePicker(image);
          } catch (error: any) {
            if (error.toString().indexOf('permission') > 0) {
              return Alert.alert(
                'Unable to access the camera',
                'Please enable it in the Settings app to open camera',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      // navigation.goBack();
                    },
                    style: 'cancel',
                  },
                  { text: 'Setting', onPress: () => Linking.openSettings() },
                ],
              );
            }
          }
        }, 500);
      } catch (error) {
        console.log({ error });
      }
    };
    const onLaunchImageLibrary = async () => {
      try {
        setTimeout(async () => {
          try {
            const image: any = await openPicker(cameraConfigs);
            handleImagePicker(image);
          } catch (error: any) {
            console.log(error);

            if (error.toString().indexOf('permission') > 0) {
              return Alert.alert(
                'Unable to access the image library',
                'Please enable it in the Settings app to open image library.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      // navigation.goBack();
                    },
                    style: 'cancel',
                  },
                  { text: 'Setting', onPress: () => Linking.openSettings() },
                ],
              );
            }
          }
        }, 400);
      } catch (error) {
        console.log({ error });
      }
    };

    const handleImagePicker = (response: ImageType) => {
      const data = {
        name: response.filename || 'avatar',
        type: response.mime,
        uri: response.path,
      };
      onChange && onChange(data);
    };

    return (
      <ActionSheet
        onPressOption={(item, index) => chooseOption(index)}
        ref={refs}
        option={[{ text: 'Camera' }, { text: 'Album' }]}
        textCancelStyle={[styles.cancelText]}
        textCancel={'Huỷ'}
        textOptionStyle={[styles.optionText]}
      />
    );
  },
);

export const ImagePicker = memo(ImagePickerComponent, equals);

const styles = StyleSheet.create({
  cancelText: {
    fontSize: fontScale(20),
    // color: '#0A84FF',
    fontWeight: '500',
  },
  optionText: {
    fontSize: fontScale(20),
    color: '#0A84FF',
  },
});
