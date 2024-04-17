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
import { FilePenLine, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
      createdOn: string;
    }[];
  };
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
}

const DatatableBase = ({
  data,
  pageNumber,
  setPageNumber,
  setSort,
  sort,
}: DatatableBaseProps) => {
  const router = useRouter();
  return (
    <>
      <div className='flex gap-2 justify-end items-center'>
        <DropdownMenu>
          <DropdownMenuTrigger className='p-2 border-blue-700 border-2 rounded'>
            Sort by
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                if (sort == 'sortField=name&sortOrder=asc') {
                  setSort('sortField=name&sortOrder=desc');
                } else setSort('sortField=name&sortOrder=asc');
              }}
            >
              Name
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                if (sort == 'sortField=amount&sortOrder=asc') {
                  setSort('sortField=amount&sortOrder=desc');
                } else setSort('sortField=amount&sortOrder=asc');
              }}
            >
              Amount
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                if (sort == 'sortField=contact&sortOrder=asc') {
                  setSort('sortField=contact&sortOrder=desc');
                } else setSort('sortField=contact&sortOrder=asc');
              }}
            >
              Contact
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                if (sort === 'sortField=createdOn&sortOrder=asc') {
                  setSort('sortField=createdOn&sortOrder=desc');
                } else setSort('sortField=createdOn&sortOrder=asc');
              }}
            >
              Date Created
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                if (sort == 'sortField=recipientType&sortOrder=asc') {
                  setSort('sortField=recipientType&sortOrder=desc');
                } else setSort('sortField=recipientType&sortOrder=asc');
              }}
            >
              Recipient
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table className='min-h-64 max-h-[calc(100vh-350px)]  '>
        {!data && (
          <TableCaption>
            A list of all donations will be shown here.
          </TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className='text-white'>Donor Name</TableHead>
            <TableHead className='text-white'>Recipient</TableHead>
            <TableHead className='text-right text-white'>Amount</TableHead>
            <TableHead className='text-right text-white'>Contact</TableHead>
            <TableHead className='text-right text-white'>
              Date Donated
            </TableHead>
            <TableHead className='text-right text-white'>Actions</TableHead>
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
              <TableCell className='text-right'>{donor.contact}</TableCell>
              <TableCell className='text-right'>
                {new Date(donor.createdOn).toLocaleDateString()}
              </TableCell>
              <TableCell className='text-right'>
                <div className='flex items-center gap-2 justify-end'>
                  <FilePenLine
                    size={20}
                    className='text-orange-500'
                    onClick={() => router.push(`/${donor?._id}`)}
                  />
                  {/* <Trash2 size={20} className='text-red-900 ' /> */}
                </div>
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
