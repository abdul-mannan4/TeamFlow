"use client"
import PageHeader from '../SharedComponents/PageHeader/pageHeader'
import Btn from '../BtnComponent/btn'
import Seachbar from '../layout/seachbar'
import ComapnyDropdown from './SearchHeader/comapnyDropdown'
import { useUsers } from '@/src/hooks/useUsers'
import { useState ,useMemo,useEffect} from 'react'
import CityDropDown from './SearchHeader/cityDropDown'
import SortDropDown from '../SharedComponents/SortDropDown/sortDropDown'
import MemberSection from './MembersGrid/memberSection'
import CreatUserCard from './CreateUser/creatUserCard'

export default function MembersComp() {

  const {users,loading,error}=useUsers();
  const [selectedCompany,setSelectedCompany]=useState("" );
  const [selectedCity,setSelectedCity]=useState("");
  const [selectedSort,setSelectedSort]=useState("")
  const sorts=["Sort:ID","Name A-Z","Name Z-A"]
  const itemsPerPage=5
  const [currentPage,setCurrentPage]=useState(1);
  const [searchQuery,setSearchQuery]=useState("");
  const [isOpen,setIsOpen]=useState(false);

 

  useEffect(()=>{
    setCurrentPage(1)
  },[searchQuery,selectedCity,selectedCompany,selectedSort]);

  const filteredUsers=useMemo(()=>{
    return users
    .filter((user)=>{
      const matcheSearch=
      !searchQuery.trim() || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.username.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCompany=!selectedCompany || user.company.name===selectedCompany;
      const matchesCity=!selectedCity || user.address.city===selectedCity;
      return matcheSearch && matchesCity && matchesCompany;
    }).sort((a,b)=>{
      if(selectedSort==="Name A-Z") return a.name.localeCompare(b.name);
      if(selectedSort==="Name Z-A") return b.name.localeCompare(a.name);
      return a.id-b.id;
    })

  },[users,selectedCity,selectedCompany,selectedSort,searchQuery])

  const totalPages=Math.ceil(filteredUsers.length/itemsPerPage) || 1;
  
  const paginatedUser=useMemo(()=>{
    const startIndex=(currentPage-1) * itemsPerPage; 
    return filteredUsers.slice(startIndex,startIndex+itemsPerPage)
  },[filteredUsers,currentPage,itemsPerPage])


  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalUsers = filteredUsers.length; 
const endIndex = Math.min(startIndex + itemsPerPage, totalUsers);

  return (
    <div className='flex flex-col p-4 sm:p-6 gap-5 sm:gap-6 w-full'>
      <PageHeader
        title="Members"
        subtitle="Manage and explore your team members."
        action={
          <Btn btnText='Add Member' onClick={()=>setIsOpen(prev=>!prev)}/>
        }
      />
      <div className='bg-white rounded-xl border border-slate-100 p-4'>
        <div className='flex flex-col md:flex-row items-stretch md:items-center gap-3'>
          <div className='flex-1 min-w-[160px]'>
            <Seachbar
              width='w-full !flex'
              placeHolder='Search Members...'
              value={searchQuery}
              onChange={(e)=>{
                setSearchQuery(e.target.value)
              }}
            />
          </div>
          <div className='flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0'>
            <ComapnyDropdown
              selectedCompany={selectedCompany}
              users={users}
              setSelectedCompany={setSelectedCompany}
              className="flex-1 sm:w-52"
            />
            <CityDropDown
              users={users}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              className="flex-1 sm:w-48"
            />
            <SortDropDown
              component={users}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              sorts={sorts}
              className="flex-1 sm:w-40"
            />
          </div>
        </div>
      </div>
      <MemberSection
        users={paginatedUser}
        totalUsers={users.length}
        startingIndex={totalUsers === 0 ? 0 : startIndex + 1}
        endingIndex={endIndex}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {isOpen && 
      <CreatUserCard setIsOpen={setIsOpen}/> 
      }
    </div>
  )
}
