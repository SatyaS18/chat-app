const getMessageContent = (type: string, content: any) => {
  switch (type) {
    case "text":
      return content;
    case "image":
      return "📷 Image";
    case "audio":
      return "🔊 Audio";
    case "pdf":
      return "📎 Attachment";
    default:
      return "Unsupported message type";
  }
};
