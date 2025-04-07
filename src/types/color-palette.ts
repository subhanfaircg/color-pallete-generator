export interface ColorPalette {
  _id: string;
  paletteId: string;
  colors: string[];
  createdAt: string;
  likes: number;
  tags: string[];
  updatedAt: string;
}

export interface ColorPaletteResponse {
  list: ColorPalette[];
  totalPages: number;
  pageNum: number;
  count: number;
} 