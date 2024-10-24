import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { useState, useRef, useEffect } from "react";
import { Send, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className='flex  mx-4 relative'>
			<button
				type='button'
				onClick={() => setShowEmojiPicker(!showEmojiPicker)}
				className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-sky-500 focus:outline-none'
			>
				<Smile size={24} />
			</button>

			<input
				type='text'
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				className='flex-grow p-3 pl-12 rounded-l-3xl border-2 border-sky-500 
        focus:outline-none focus:ring-2 focus:ring-gray-300'
				placeholder='Type a message...'
			/>

			<button
				type='submit'
				className='bg-blue-500 text-white p-3 rounded-r-lg 
        hover:bg-purple-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-300'
			>
				<Send size={24} />
			</button>
			{showEmojiPicker && (
				<div ref={emojiPickerRef} className='absolute bottom-20 left-4'>
					<EmojiPicker
						onEmojiClick={(emojiObject) => {
							setMessage((prevMessage) => prevMessage + emojiObject.emoji);
						}}
					/>
				</div>
			)}
		</form>
  );
};

export default MessageInput;
