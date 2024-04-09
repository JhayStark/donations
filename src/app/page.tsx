'use client';

import { useState } from 'react';
import { BadgeCent, HandCoins, UsersRound } from 'lucide-react';
import Link from 'next/link';
import DatatableBase from './DatatableBase';
import api from '@/lib/axiosInstance';
import useSWR from 'swr';
import { formatCurrencyToGHS } from '@/lib/utils';

const fetcher = (url: string) => api.get(url).then(res => res.data);

const StatsCard = ({
  title,
  value,
  hexcode,
  textColor,
  icon,
}: {
  title: string;
  value?: number | string;
  hexcode: string;
  textColor?: string;
  icon?: any;
}) => (
  <div
    className={` flex flex-col w-full ${hexcode} py-8 px-7 rounded-2xl gap-5`}
  >
    <div className='flex flex-row items-center justify-between'>
      <h2
        className={`${textColor} lg:text-[0.790rem] xl:text-[0.901rem] 2xl:text-[1.145rem]`}
      >
        {title}
      </h2>
      {icon}
    </div>
    <div className='flex flex-row items-center justify-between'>
      <p
        className={`${textColor} lg:text-[0.790rem] xl:text-[0.901rem] 2xl:text-[1.145rem]`}
      >
        {value ?? 0}
      </p>
    </div>
  </div>
);

export default function Home() {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, error, isLoading } = useSWR(
    `/donations?page=${pageNumber}`,
    fetcher
  );
  const { data: statsData } = useSWR(`/donations/stats`, fetcher);

  return (
    <>
      <div className='w-full  gap-3  flex flex-col md:flex-row  items-end mb-5 lg:mb-20'>
        <Link href='/add'>
          <button className='flex items-center font-semibold cursor-pointer hover:opacity-60 text-lg w-52 mb-2 gap-3 '>
            <HandCoins />
            <span>Collect Donation</span>
          </button>
        </Link>
        <StatsCard
          title='Total Donations'
          hexcode='bg-[#043F2E]'
          textColor='text-[#FFFFE2]'
          value={formatCurrencyToGHS(statsData?.total)}
          icon={<BadgeCent className='text-white' />}
        />
        <StatsCard
          title='Total Donors'
          hexcode='bg-[#FFD249]'
          textColor='text-[#1E1E1E]'
          value={new Intl.NumberFormat().format(statsData?.count)}
          icon={<UsersRound />}
        />
      </div>

      <DatatableBase
        data={data}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
      />
    </>
  );
}
