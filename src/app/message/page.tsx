'use client';

import React, { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextareaFormField } from '@/components/formFields';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import api from '@/lib/axiosInstance';
import Link from 'next/link';
import { CircleArrowLeft } from 'lucide-react';

const formSchema = z.object({
  message: z.string().min(1),
});

const Page = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    api
      .post('/donations/send-sms', data)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };
  return (
    <Form {...form}>
      <div className='pb-5'>
        <Link href='/'>
          <button className='flex items-center gap-5'>
            <CircleArrowLeft />
            Back
          </button>
        </Link>
        <h1 className='text-lg lg:text-3xl font-semibold text-center'>
          Thank You Message Form
        </h1>
      </div>
      <form className='space-y-5' onSubmit={form.handleSubmit(handleSubmit)}>
        <TextareaFormField
          form={form}
          name='message'
          label='Message'
          placeholder='Enter message here'
          description='To insert an individuals name type $name$ in place of the persons name Eg. Hello $name$ thank you for your donation'
        />
        <div>
          <Label>Sample Message</Label>
          <p className='min-h-20 min-w-full border-white border-2 rounded p-2'>
            {form.watch('message')?.includes('$name$')
              ? form.watch('message').replace('$name$', 'Kwesi Tenkorang')
              : form.watch('message')}
          </p>
        </div>
        <Button
          className='bg-white text-black hover:text-white w-full h-16'
          type='submit'
        >
          {!loading ? (
            'Submit'
          ) : (
            <div
              className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
              role='status'
            >
              <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                Loading...
              </span>
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Page;
