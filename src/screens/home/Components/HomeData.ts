export interface HomeFileds {
  id: number | string;
  title: string;
  type: string;
}

export const HomeData: Array<HomeFileds> = [
  {
    id: 1,
    title: 'Tuyển tập hàng đầu',
    type: 'toplist',
  },
  {
    id: 2,
    title: 'Dành cho bạn',
    type: 'recommend',
  },
  {
    id: 3,
    title: 'Phổ biến',
    type: 'popular',
  },
  {
    id: 4,
    title: 'Bảng xếp hạng',
    type: 'rank',
  },
];
