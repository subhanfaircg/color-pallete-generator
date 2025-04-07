'use client';

import { useState } from 'react';
import { ColorPalette } from '../components/ColorPalette';
import { ColorMultiSelect } from '../components/ColorMultiSelect';
import { getColorPalettes } from '../services/color-palette.service';
import { ColorPalette as ColorPaletteType } from '../types/color-palette';

const colors = [
  { name: 'Red', value: 'red', hex: '#FF0000' },
  { name: 'Blue', value: 'blue', hex: '#0000FF' },
  { name: 'Green', value: 'green', hex: '#00FF00' },
  { name: 'Yellow', value: 'yellow', hex: '#FFFF00' },
  { name: 'Purple', value: 'purple', hex: '#800080' },
  { name: 'Pink', value: 'pink', hex: '#FFC0CB' },
  { name: 'Orange', value: 'orange', hex: '#FFA500' },
  { name: 'Brown', value: 'brown', hex: '#A52A2A' },
  { name: 'Black', value: 'black', hex: '#000000' },
  { name: 'White', value: 'white', hex: '#FFFFFF' },
];

export default function Home() {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [palettes, setPalettes] = useState<ColorPaletteType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleColorSelect = async (colors: string[]) => {
    setSelectedColors(colors);
    setLoading(true);
    setError('');
    setPalettes([]);

    try {
      // Fetch palettes for each selected color
      const palettePromises = colors.map(color => getColorPalettes(color));
      const results = await Promise.all(palettePromises);
      const allPalettes = results.flatMap(result => result.list);
      setPalettes(allPalettes);
    } catch (err) {
      setError('Failed to fetch color palettes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Color Palette Generator</h1>
        
        <div className="mb-8">
          <label htmlFor="color-select" className="block text-lg font-medium text-gray-700 mb-2">
            Select Colors
          </label>
          <ColorMultiSelect
            colors={colors}
            selectedColors={selectedColors}
            onChange={handleColorSelect}
          />
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <div className="space-y-8">
          {palettes.map((palette) => (
            <ColorPalette key={palette._id} palette={palette} />
          ))}
        </div>
      </div>
    </main>
  );
}
