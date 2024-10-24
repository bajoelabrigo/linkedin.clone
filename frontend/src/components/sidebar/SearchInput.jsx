import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";

const SearchInput = () => {
  const [search, setSearch] = useState("")
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    if(search.length < 3) return toast.error("Search term must be at least 3 characters long");

    const conversation = conversations.find((c) => c.name.toLowerCase(). includes(search.toLowerCase()));

    if(conversation){
      setSelectedConversation(conversation);
      setSearch("");
    }else toast.error("No such user found");
  }
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered border-sky-500 w-full rounded-full placeholder:text-sky-500 placeholder:font-semibold"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;