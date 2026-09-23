import React, { useState } from 'react'
import FilterBtn from '@/src/components/Tasks/FiltersSection/filterBtn'

export default function StatusCheckBtn({selectedFilter,setSelectedFilter}:{selectedFilter:string,
    setSelectedFilter:React.Dispatch<React.SetStateAction<string>>}) {

   
  return (
    <div className='flex gap-2 mb-4'>
            <div className="flex-1 lg:flex-initial">
                      <FilterBtn
                        btnText="All"
                        selected={selectedFilter === "All"}
                        onClick={() => setSelectedFilter("All")}
                        css="px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer"
                      />
                    </div>
                    <div className="flex-1 lg:flex-initial">
                      <FilterBtn
                        btnText="Completed"
                        selected={selectedFilter === "Completed"}
                        onClick={() => setSelectedFilter("Completed")}
                       css="px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer"
                      />
                    </div>
                    <div className="flex-1 lg:flex-initial">
                      <FilterBtn
                        btnText="Pending"
                        selected={selectedFilter === "Pending"}
                        onClick={() => setSelectedFilter("Pending")}
                       css="px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer"
                      />
                    </div>
    </div>
  )
}
