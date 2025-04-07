'use client';

import { useState, useRef, useEffect } from 'react';

interface Color {
  name: string;
  value: string;
  hex: string;
}

interface ColorMultiSelectProps {
  colors: Color[];
  selectedColors: string[];
  onChange: (colors: string[]) => void;
}

export const ColorMultiSelect = ({ colors, selectedColors, onChange }: ColorMultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      onChange(selectedColors.filter(c => c !== color));
    } else {
      onChange([...selectedColors, color]);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex flex-wrap gap-2 p-2 min-h-[40px] border border-gray-300 rounded-md cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedColors.length > 0 ? (
          selectedColors.map(colorValue => {
            const color = colors.find(c => c.value === colorValue);
            return color ? (
              <div
                key={color.value}
                className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-full"
              >
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-sm">{color.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleColor(color.value);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            ) : null;
          })
        ) : (
          <span className="text-gray-500">Select colors...</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
          {colors.map((color) => (
            <div
              key={color.value}
              className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 ${
                selectedColors.includes(color.value) ? 'bg-gray-50' : ''
              }`}
              onClick={() => toggleColor(color.value)}
            >
              <div
                className="w-6 h-6 rounded-full border border-gray-300"
                style={{ backgroundColor: color.hex }}
              />
              <div className="flex-1">
                <div className="font-medium">{color.name}</div>
                <div className="text-sm text-gray-500">{color.hex}</div>
              </div>
              {selectedColors.includes(color.value) && (
                <div className="text-green-500">✓</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 