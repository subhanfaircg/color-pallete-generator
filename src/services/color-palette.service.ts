import { ColorPaletteResponse } from '../types/color-palette';

const API_BASE_URL = 'https://pixelied.com/api';

export const getColorPalettes = async (color: string, page: number = 1): Promise<ColorPaletteResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/color-palettes/search?tags=${color}&pageNum=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch color palettes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching color palettes:', error);
    throw error;
  }
}; 