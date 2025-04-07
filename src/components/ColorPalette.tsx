import { ColorPalette as ColorPaletteType } from '../types/color-palette';
import { useState } from 'react';

interface ColorPaletteProps {
  palette: ColorPaletteType;
}

export const ColorPalette = ({ palette }: ColorPaletteProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (color: string, index: number) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  return (
    <div className="mb-8 p-6 rounded-lg shadow-lg bg-white">
      <div className="flex h-40 rounded-md overflow-hidden">
        {palette.colors.map((color, index) => (
          <div
            key={index}
            className="flex-1 relative group cursor-pointer transition-all hover:flex-[1.2]"
            style={{ backgroundColor: color }}
            onClick={() => copyToClipboard(color, index)}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <div className="bg-white/90 px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
                {copiedIndex === index ? (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Click to copy
                  </div>
                )}
              </div>
            </div>
            <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white text-xs font-medium p-1 rounded">
              {color}
            </div>
          </div>
        ))}
      </div>
      <div className="text-sm text-gray-600">
        <p>Likes: {palette.likes}</p>
        <p>Tags: {palette.tags.join(', ')}</p>
      </div>
    </div>
  );
}; 