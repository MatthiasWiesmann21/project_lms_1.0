"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "@/components/emoji-picker";
import { useState } from "react";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  className?: string;
  placeHolder?: string;
  getPosts: any;
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInputPost = ({
  apiUrl,
  query,
  className,
  placeHolder,
  getPosts,
}: ChatInputProps) => {
  const { onOpen } = useModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const [isSending, setSending] = useState(false);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isSending) return;
    setSending(true);
    try {
      await axios.post(apiUrl, { ...query, text: values?.content });

      form.reset();
      router.refresh();
      getPosts();
      setSending(false);
    } catch (error) {
      console.log(error);
      setSending(false);
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
                <div className={`relative p-4 pb-6 ${className}`}>
                  <Input
                    disabled={isLoading}
                    className="border-0 border-none bg-zinc-200/90 py-6 text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-zinc-700/75 dark:text-zinc-200"
                    placeholder={placeHolder}
                    {...field}
                  />
                  <div className="absolute right-8 top-7">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value}${emoji}`)
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
