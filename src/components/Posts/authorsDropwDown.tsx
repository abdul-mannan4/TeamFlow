import type { Post } from "@/src/types/post";
import type { User } from "@/src/types/users";
import { useState } from "react";
import UseClickOutside from "@/src/hooks/useClickOutside";
import DropDownBtn from "../SharedComponents/DropDownBtn/dropDownBtn";

export default function AuthorsDropwDown({
  posts,
  users,
  authorPlaceholder="All Authors",
  selectedAuthor,
  setSelectedAuthor,
  className = "w-56",
}: {
  posts: Post[];
  users: User[];
  authorPlaceholder?:string
  selectedAuthor: string;
  setSelectedAuthor: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = UseClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });
  const authorsId = [...new Set(posts.map((post) => post.userId))];
  const authors = users.filter((user) => authorsId.includes(user.id)).map((author)=>author.name);

  const handleSelect=(author:string)=>{
    setSelectedAuthor(author);
    setIsOpen(false)
  }
  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <DropDownBtn
        placeholder="All Authors"
        selectedComponent={selectedAuthor}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {isOpen && (
         <div className='absolute left-0 top-full z-50 w-full mt-2 rounded-lg border border-slate-200 bg-white p-1 shadow-lg'>
          <button
            type="button"
            onClick={() => handleSelect("")}
            className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-indigo-50 ${
              selectedAuthor === ""
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-600"
            }`}>
                {authorPlaceholder}
            </button>
            {authors.map((author)=>(
                       <button 
                        type='button'
                        key={author}
                        onClick={()=>handleSelect(author)}
                                      className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-indigo-50 w-full truncate ${
                selectedAuthor === author
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-700"
              }`}
 >
                            {author}
                        </button>
            ))}


        </div>
      )}
    </div>
  );
}
