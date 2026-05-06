type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const PaginationItem = ({
  children,
  disabled,
  active,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      data-active={active}
      disabled={disabled}
      onClick={onClick}
      className="data-[active='true']:border-[#E4E4E7] min-w-10 min-h-10 rounded-md border border-transparent flex justify-center items-center gap-2 p-2.5 cursor-pointer disabled:opacity-30"
    >
      {children}
    </button>
  );
};

export const PaginationPlaceHolder = () => {
  return (
    <PaginationItem>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.9993 12.6668C12.3675 12.6668 12.666 12.3684 12.666 12.0002C12.666 11.632 12.3675 11.3335 11.9993 11.3335C11.6312 11.3335 11.3327 11.632 11.3327 12.0002C11.3327 12.3684 11.6312 12.6668 11.9993 12.6668Z"
          stroke="#09090B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.666 12.6668C17.0342 12.6668 17.3327 12.3684 17.3327 12.0002C17.3327 11.632 17.0342 11.3335 16.666 11.3335C16.2978 11.3335 15.9993 11.632 15.9993 12.0002C15.9993 12.3684 16.2978 12.6668 16.666 12.6668Z"
          stroke="#09090B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.33268 12.6668C7.70087 12.6668 7.99935 12.3684 7.99935 12.0002C7.99935 11.632 7.70087 11.3335 7.33268 11.3335C6.96449 11.3335 6.66602 11.632 6.66602 12.0002C6.66602 12.3684 6.96449 12.6668 7.33268 12.6668Z"
          stroke="#09090B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </PaginationItem>
  );
};

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const handlePrev = () => {
    onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-end gap-1 my-10">
      <PaginationItem disabled={currentPage === 1} onClick={handlePrev}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12L6 8L10 4"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Previous
      </PaginationItem>
      {currentPage > 2 && (
        <PaginationItem onClick={() => onPageChange(1)}>1</PaginationItem>
      )}
      {currentPage > 3 && <PaginationPlaceHolder />}

      {currentPage === 1 && (
        <PaginationItem active onClick={() => onPageChange(1)}>
          1
        </PaginationItem>
      )}

      {[-1, 0, 1].map((num) => {
        const page = currentPage + num;
        if (page !== 0 && page !== 1 && page !== totalPages) {
          return (
            <PaginationItem
              active={page === currentPage}
              key={num}
              onClick={() => onPageChange(page)}
            >
              {page}
            </PaginationItem>
          );
        }
      })}

      {totalPages - 3 > currentPage && <PaginationPlaceHolder />}
      {totalPages - 2 > currentPage && (
        <PaginationItem onClick={() => onPageChange(1)}>
          {totalPages}
        </PaginationItem>
      )}

      <PaginationItem
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12L10 8L6 4"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </PaginationItem>
    </div>
  );
};
