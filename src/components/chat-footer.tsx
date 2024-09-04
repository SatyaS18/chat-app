import { useIsDesktop } from "@/hooks/use-is-desktop";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { useSidebarWidth } from "@/hooks/use-sidebar-width";
import { useTheme } from "next-themes";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { z } from "zod";
import { api } from "../../convex/_generated/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import axios from "axios";

const ChatMessageSchema = z.object({
  content: z.string().min(1, {
    message: "Message must not be empty",
  }),
});

type ChatFooterProps = {
  chatId: string;
  currentUserId: string;
};

export const ChatFooter: FC<ChatFooterProps> = ({ chatId, currentUserId }) => {
  const { mutate: createMessage, state: createMessageState } =
    useMutationHandler(api.message.create);
  const isDesktop = useIsDesktop();
  const { sidebarWidth } = useSidebarWidth();
  const { resolvedTheme } = useTheme();
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [imageOrPdf, setImageOrPdf] = useState<Blob | null>(null);
  const [imageOrPdfModalOpen, setImageOrPdfModalOpen] = useState(false);
  const [sendingFile, setSendingFile] = useState(false);

  registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

  const form = useForm<z.infer<typeof ChatMessageSchema>>({
    resolver: zodResolver(ChatMessageSchema),
    defaultValues: { content: "" },
  });

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe(chatId);

    channel.bind("typing", (data: { isTyping: boolean; userId: string }) => {
      if (data.userId !== currentUserId) {
        setIsTyping(data.isTyping);
      }
    });

    return () => {
      pusher.unsubscribe(chatId);
    };
  }, [chatId, currentUserId]);

  const createMessagehandler = async ({
    content,
  }: z.infer<typeof ChatMessageSchema>) => {
    if (!content || content.length < 1) return;
    try {
      await createMessage({
        conversationId: chatId,
        type: "text",
        content: [content],
      });
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof ConvexError ? error.data : "An error occurred"
      );
    }
  };

  const handleInputChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value, selectionStart } = e.target;

    if (selectionStart !== null) form.setValue("content", value);

    if (!typing) {
      setTyping(true);
      await axios.post("/api/type-indicator", {
        channel: chatId,
        event: "typing",
        data: { isTyping: true, userId: currentUserId },
      });

      setTimeout(() => {
        setTyping(false);
        axios.post("/api/type-indicator", {
          channel: chatId,
          event: "typing",
          data: { isTyping: false, userId: currentUserId },
        });
      }, 2000);
    }
  };

  return <div className="">ChatFooter</div>;
};

export default ChatFooter;
