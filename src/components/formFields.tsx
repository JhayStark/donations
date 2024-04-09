import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InputFormFieldProps {
  form: any;
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
}

export const InputFormField = ({
  form,
  name,
  label,
  type = 'text',
  disabled = false,
  placeholder,
}: InputFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div>
            <FormControl>
              <Input
                {...field}
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                className='bg-transparent border-0 border-b-2 rounded-none border-[#043F2E]'
                autoComplete='off'
              />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

interface SelectFormFieldProps {
  form: any;
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  options?: string[];
}

export const SelectFormField = ({
  form,
  name,
  label,
  placeholder,
  options = [],
}: SelectFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div>
            <Select {...field} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className='bg-transparent border-0 border-b-2 rounded-none border-[#043F2E]'>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className='bg-[#FFFFE2]'>
                {options.map(option => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
