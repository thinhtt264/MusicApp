import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { TrackDataItemFields } from 'src/models/Track';
import Layout from 'src/themes/Layout';
import { BoldText, RegularText } from 'src/components/text';
import { fontScale, scale } from 'src/common/scale';
import { Spacer } from 'src/components/spacer';
import Colors from 'src/themes/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { optionList } from 'src/common/service';
import {
  AddToPlaylistIcon,
  AddToQueueIcon,
  ViewAlbumIcon,
  ViewArtistIcon,
} from 'src/components/svg';
import { addTrackToPlaylist, checkLoveTrack } from 'src/common/firebase';

type Props = {
  info: TrackDataItemFields;
  onCloseModal: () => void;
};

const BottomSheetContent = ({ info, onCloseModal }: Props) => {
  const [isLiked, setLiked] = useState(false);

  const handleLikePress = useCallback(() => {
    addTrackToPlaylist({ data: info, callback: () => {} });
  }, []);

  useEffect(() => {
    if (info?.id) {
      checkLoveTrack(info).then(bool => {
        setLiked(bool);
      });
    }
  }, []);

  const OptionCard = ({ item }: any) => {
    const renderIcon = () => {
      const iconSize = scale(24);
      const color = Colors.unActive;

      const IconComponent = () => {
        switch (item.id) {
          case 0:
            return (
              <>
                {isLiked ? (
                  <Ionicons
                    name="heart-sharp"
                    size={iconSize}
                    color={Colors.green.default}
                  />
                ) : (
                  <Ionicons
                    name="heart-outline"
                    size={iconSize}
                    color={color}
                  />
                )}
              </>
            );
          case 1:
            return (
              <AddToPlaylistIcon
                width={iconSize}
                height={iconSize}
                color={color}
                viewBox={`-5 0 ${68} ${60}`}
              />
            );
          case 2:
            return (
              <AddToQueueIcon
                width={iconSize}
                height={iconSize}
                color={color}
                viewBox={`-5 0 ${68} ${60}`}
              />
            );
          case 3:
            return (
              <ViewAlbumIcon
                width={iconSize}
                height={iconSize}
                color={color}
                viewBox={`-5 0 ${68} ${60}`}
              />
            );
          case 4:
            return (
              <ViewArtistIcon
                width={iconSize}
                height={iconSize}
                color={color}
                viewBox={`-5 0 ${68} ${60}`}
              />
            );
          case 5:
            return (
              <Ionicons
                name={item.inactiveIcon}
                size={iconSize}
                color={color}
              />
            );
          default:
            return null;
        }
      };

      const iconHandlers = [
        {
          id: 0,
          onPress: handleLikePress,
        },
        {
          id: 1,
          onPress: () => {
            // Do something else
          },
        },
        {
          id: 2,
          onPress: () => {
            // Do something else
          },
        },
        {
          id: 3,
          onPress: () => {
            // Do something else
          },
        },
        {
          id: 4,
          onPress: () => {
            // Do something else
          },
        },
      ];

      return (
        <TouchableOpacity
          style={[Layout.rowVCenter, styles.option]}
          onPress={() => {
            iconHandlers[item.id] && iconHandlers[item.id].onPress();
            onCloseModal();
          }}>
          <IconComponent />
          <View style={{ paddingLeft: scale(10) }}>
            <BoldText textStyle={{ fontSize: fontScale(15) }}>
              {item.id === 0 && isLiked ? item.liked : item.name}
            </BoldText>
          </View>
        </TouchableOpacity>
      );
    };
    return <View>{renderIcon()}</View>;
  };

  if (!info) return null;
  return (
    <View style={styles.container}>
      <View style={[Layout.rowVCenter, { paddingHorizontal: scale(15) }]}>
        <Image
          style={styles.img}
          resizeMode="cover"
          source={{ uri: info?.album?.images[0]?.url ?? '' }}
        />
        <View style={[Layout.colVCenter, styles.cardInfo]}>
          <BoldText textStyle={{ fontSize: fontScale(16) }} numberOfLines={1}>
            {info.name}
          </BoldText>
          <Spacer size={scale(5)} />
          <RegularText
            textStyle={{ fontSize: fontScale(12), color: Colors.unActive }}>
            {info.artists[0].name}
          </RegularText>
        </View>
      </View>
      <Spacer
        size={scale(15)}
        style={{ borderBottomColor: Colors.grey.placeHolder, borderWidth: 0.2 }}
      />
      {optionList.Card_Music.map((i: any, index) => {
        return (
          <View key={index} style={{ paddingHorizontal: scale(15) }}>
            <Spacer size={scale(20)} />
            <OptionCard item={i} />
          </View>
        );
      })}
    </View>
  );
};

export default BottomSheetContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: scale(5),
  },
  img: {
    width: scale(40),
    height: scale(40),
  },
  cardInfo: {
    marginLeft: scale(10),
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingRight: scale(50),
  },
  option: {
    // borderWidth:2, borderColor:'red'
  },
});
