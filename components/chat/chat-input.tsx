"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip } from "lucide-react";
import { useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "@/components/emoji-picker";
import { useLanguage } from "@/lib/check-language";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string | null;
  type: "conversation" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const currentLanguage = useLanguage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });

      await axios.post(url, values);

      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <Input
                    disabled={isLoading}
                    className="border-0 border-none bg-[#ebedf0] py-6 pr-[90px] text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-[#192130] dark:text-zinc-200"
                    placeholder={`${
                      currentLanguage.chat_ChatInput_placeholder
                    } ${type === "conversation" ? name : "#" + name}`}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => onOpen("messageFile", { apiUrl, query })}
                    className="absolute right-[65px] top-7 flex h-[24px] w-[24px] items-center justify-center rounded-full p-1 transition-all duration-300 hover:bg-zinc-500 dark:hover:bg-zinc-300"
                  >
                    <Paperclip className="text-[#71717a] hover:text-white dark:text-[#a1a1aa] dark:hover:text-[#71717a]" />
                  </button>
                  <div className="absolute right-8 top-7">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
