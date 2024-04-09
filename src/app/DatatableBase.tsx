'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { formatCurrencyToGHS } from '@/lib/utils';

interface DatatableBaseProps {
  data: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    donations: {
      _id: string;
      name: string;
      contact: string;
      amount: string;
      recipientType: string;
      recipientName: string;
    }[];
  };
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const DatatableBase = ({
  data,
  pageNumber,
  setPageNumber,
}: DatatableBaseProps) => {
  return (
    <>
      <Table className='min-h-64 max-h-[calc(100vh-350px)]  '>
        {!data && (
          <TableCaption>
            A list of all donations will be shown here.
          </TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead>Donor Name</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.donations?.map(donor => (
            <TableRow key={donor._id} className='cursor-pointer'>
              <TableCell className='font-medium'>{donor.name}</TableCell>
              <TableCell>
                {donor.recipientName || donor.recipientType}
              </TableCell>
              <TableCell className='text-right'>
                {formatCurrencyToGHS(parseInt(donor.amount))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem className='cursor-pointer'>
            <PaginationPrevious
              onClick={() => {
                if (pageNumber > 1) {
                  setPageNumber(prev => prev - 1);
                }
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>
              <p className='text-center'>{`${data?.page || 0} of ${
                data?.totalPages || 0
              }`}</p>
            </PaginationLink>
          </PaginationItem>
          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
          <PaginationItem className='cursor-pointer'>
            <PaginationNext
              onClick={() => {
                if (pageNumber != data?.totalPages) {
                  setPageNumber(prev => prev + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default DatatableBase;
