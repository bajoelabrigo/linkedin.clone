import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'

const Sidebar = () => {
  return (
    <div className='border-r border-slate-100 p-4 flex flex-col '>
    <SearchInput/>
    <div className='mt-1'/>
    <Conversations/>
    <LogoutButton/>
    </div>
  )
}

export default Sidebar