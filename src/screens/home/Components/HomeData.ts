import { CATEGORY_ID } from "src/common/api";

export interface HomeFileds {
  id: number | string;
  title: string;
  type: string;
}

export const HomeData: Array<HomeFileds> = [
  {
    id: 0,
    title: 'Tuyển tập hàng đầu',
    type: 'toplist',
  },
  {
    id: 20,
    title: 'Dành cho bạn',
    type: 'recommend',
  },
  {
    id: 60,
    title: 'Phổ biến',
    type: 'popular',
  },
  // {
  //   id: 20,
  //   title: 'Bảng xếp hạng',
  //   type: 'rank',
  // },
];
