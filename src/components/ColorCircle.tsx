interface ColorCircleProps {
  color: string;
  name: string;
}

export const ColorCircle = ({ color, name }: ColorCircleProps) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-4 h-4 rounded-full border border-gray-300"
        style={{ backgroundColor: color }}
      />
      <span>{name}</span>
    </div>
  );
}; 