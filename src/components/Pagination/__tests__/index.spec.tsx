import { render, screen } from "@testing-library/react";
import { Pagination } from "..";
import userEvent from "@testing-library/user-event";

describe("<Pagination />", () => {
  it("should render pagination without previous page", () => {
    const onHandleNextFn = jest.fn();
    render(
      <Pagination onHandleNext={onHandleNextFn} onHandlePrevious={jest.fn()} />
    );

    expect(screen.getByText(/anterior/i)).toHaveClass("text-gray-500");

    const nextPage = screen.getByText(/próximo/i);
    expect(nextPage).toBeInTheDocument();
    userEvent.click(nextPage);
    expect(onHandleNextFn).toHaveBeenCalled();
  });

  it("should render pagination with previous page", () => {
    const onHandlePreviousFn = jest.fn();
    const prevPage = "testing";
    render(
      <Pagination
        previousPage={prevPage}
        onHandleNext={jest.fn()}
        onHandlePrevious={onHandlePreviousFn}
      />
    );

    const prevPageLabel = screen.getByText(/anterior/i);
    expect(prevPageLabel).not.toHaveClass("text-gray-500");
    userEvent.click(prevPageLabel);
    expect(onHandlePreviousFn).toHaveBeenCalled();
  });
});
