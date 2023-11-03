import { useMemo } from "react";

interface LabelProps {
  label: string;
}

const getLabelTypeColor = (type: string) => {
  const typeUpperCase = type.toUpperCase();
  const color = {
    NORMAL: "bg-amber-300",
    FIGHT: "bg-orange-900",
    FLYING: "bg-indigo-500",
    POISON: "bg-purple-700",
    GROUND: "bg-pink-500",
    ROCK: "bg-yellow-800",
    BUG: "bg-lime-800",
    GHOST: "bg-blue-900",
    STEEL: "bg-stone-400",
    FIRE: "bg-red-600",
    WATER: "bg-blue-500",
    GRASS: "bg-green-500",
    ELECTRIC: "bg-yellow-400",
    PSYCHIC: "bg-fuchsia-950",
    ICE: "bg-indigo-300",
    DRAGON: "bg-orange-700",
    DARK: "bg-neutral-700",
    FAIRY: "bg-rose-400",
  }[typeUpperCase];

  return color ? color : "bg-cyan-800";
};

export const Label = ({ label }: LabelProps) => {
  const color = useMemo(() => {
    return getLabelTypeColor(label);
  }, [label]);

  return (
    <div
      data-testId="label wrapper"
      className={`${color} rounded-md h-2 w-16 text-white p-4 flex justify-center items-center`}
    >
      <p>{label}</p>
    </div>
  );
};
