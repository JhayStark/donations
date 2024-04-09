'use client';

import React from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputFormField, SelectFormField } from '@/components/formFields';
import { Button } from '@/components/ui/button';
import { CircleArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import api from '@/lib/axiosInstance';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Donor name required' }),
  contact: z.string().min(1, { message: 'Donor contact required' }),
  amount: z
    .string()
    .min(1, { message: 'Amount must be 1 or more' })
    .refine(
      value => {
        // Convert value to a number for comparison
        const numericValue = parseFloat(value);
        // Check if the numeric value is less than 1
        return numericValue >= 1;
      },
      {
        message: 'Amount must be 1 or more',
      }
    ),
  recipientName: z.string(),
  recipientType: z.string().min(1, { message: 'Recipient type required' }),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      contact: '',
      amount: '',
      recipientName: '',
      recipientType: '',
    },
  });
  const { toast } = useToast();
  const submitForm = async (data: z.infer<typeof formSchema>) => {
    try {
      await api.post('/donations/add', data);
      toast({
        title: 'Donation Recieved',
        description: `Donation of GHS ${data.amount} recieved from ${data.name}`,
      });
    } catch (error) {
      toast({
        title: 'Donation Failed',
        description: `Donation of GHS ${data.amount} failed from ${data.name}`,
        variant: 'destructive',
      });
    }
  };

  const renderInputField = (
    label: string,
    fieldName: string,
    placeholder?: string,
    type?: string
  ) => (
    <InputFormField
      label={label}
      form={form}
      name={fieldName}
      type={type}
      placeholder={placeholder}
    />
  );

  const renderSelectField = (
    label: string,
    fieldName: string,
    options?: string[],
    placeholder?: string
  ) => (
    <SelectFormField
      label={label}
      form={form}
      name={fieldName}
      options={options}
      placeholder={placeholder}
    />
  );
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
          Donation Form
        </h1>
      </div>
      <form
        className='w-full mx-auto max-w-3xl h-[85%] flex-grow flex flex-col justify-between'
        onSubmit={form.handleSubmit(submitForm)}
        autoComplete='off'
      >
        <div className='space-y-10'>
          {renderInputField('Name', 'name', 'Enter name of donor')}
          {renderInputField('Contact', 'contact', 'Enter contact of donor')}
          {renderInputField(
            'Amount',
            'amount',
            'Enter donation amount in cedis',
            'number'
          )}
          {renderSelectField(
            'Recipient Type',
            'recipientType',
            ['Family', 'Spouse', 'Children', 'Individual (Enter name below)'],
            'Select recipient type'
          )}
          {form.watch('recipientType').includes('Individual') &&
            renderInputField(
              'Recipient Name',
              'recipientName',
              'Enter name of recipient'
            )}
        </div>

        <Button
          className='bg-white text-black hover:text-white w-full h-16'
          type='submit'
        >
          Recieve Donation
        </Button>
      </form>
    </Form>
  );
};

export default Page;
