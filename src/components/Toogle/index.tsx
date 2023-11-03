export interface ToogleProps {
  isDark: boolean;
  handleDark: VoidFunction;
}

export const Toogle = ({ isDark = false, handleDark }: ToogleProps) => {
  return (
    <div
      aria-label="toggle trocar modo escuro"
      className="h-5 w-12 rounded-lg bg-gray-400 cursor-pointer relative dark:bg-gray-800"
      onClick={handleDark}
    >
      <div
        className={`rounded-2xl h-full w-6 bg-white absolute ${
          isDark ? "right-0" : "left-0"
        }`}
      ></div>
    </div>
  );
};
