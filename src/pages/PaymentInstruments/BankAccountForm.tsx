import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { PaymentInstrument } from "@models/PaymentInstrument.model";

type BankAccountFormProps = {
  form: UseFormReturn<
    {
      instrumentName: string;
      instrumentType: string;
      bankName?: string | undefined;
      accountNumber?: string | undefined;
    },
    PaymentInstrument,
    undefined
  >;
};

export function BankAccountForm({ form }: BankAccountFormProps) {
  return (
    <Form {...form}>
      <form className="p-4 grid items-start gap-4">
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <FormField
              control={form.control}
              name="instrumentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instrument Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Instrument Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <FormField
              control={form.control}
              name="instrumentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instrument Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an Instrument Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Bank Account">Bank Account</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {form.getValues("instrumentType") == "Bank Account" ? (
            <>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Bank Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Account Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </form>
    </Form>
  );
}
