import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  totalPages: number;
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  page,
  totalPages,
  total,
  perPage,
  onPageChange,
}: Props) => {
  return (
    <div className="flex justify-between items-center text-xs w-full">
      <span>
        Showing {total === 0 ? 0 : (page - 1) * perPage + 1} to{" "}
        {Math.min(page * perPage, total)} of {total}
      </span>

      <div className="flex gap-2">
        <Button
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </Button>

        <Button
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination