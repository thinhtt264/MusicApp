import { kHeight } from 'src/common/constants';
import { hasNotch } from 'src/common/device';
import { fontScale, scale } from 'src/common/scale';

export const MINIPLAYER_HEIGHT = hasNotch() ? scale(60) : scale(50);
export const FULLSCREEN_HEIGHT = kHeight - MINIPLAYER_HEIGHT;

export default {
  scale5: scale(5),
  scale10: scale(10),
  scale15: scale(15),
  scale20: scale(20),
  scale25: scale(25),
  scale30: scale(30),
  scale35: scale(35),
  scale40: scale(40),
  scale50: scale(50),
  scale60: scale(60),
  scale70: scale(70),
  scale80: scale(80),
  scale90: scale(90),
  scale100: scale(100),
  fontScale10: fontScale(10),
  fontScale14: fontScale(14),
  fontScale18: fontScale(18),
};