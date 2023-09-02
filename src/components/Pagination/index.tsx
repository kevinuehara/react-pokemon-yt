interface PaginationProps {
  previousPage?: string;
  onHandlePrevious: VoidFunction;
  onHandleNext: VoidFunction;
}

export const Pagination = ({
  onHandleNext,
  onHandlePrevious,
  previousPage,
}: PaginationProps) => {
  return (
    <>
      <label
        className={`mr-2 ${
          previousPage !== null
            ? "text-blue-600 hover:text-blue-800 cursor-pointer"
            : "text-gray-500"
        }`}
        onClick={previousPage !== null ? onHandlePrevious : () => {}}
      >
        {"<<"} Anterior
      </label>
      <label className="text-blue-600">||</label>
      <label
        className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer"
        onClick={onHandleNext}
      >
        Próximo {">>"}
      </label>
    </>
  );
};
