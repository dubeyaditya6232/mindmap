import { Box } from '@mui/material'
import React from 'react'
import SearchBox from './searchBox/SearchBox'
import TreeComponent from './Tree/TreeComponent'
import Header from './Header/Header'

const Layout = ({ children, searchValue, setSearchValue, setLoading, setTreeData }) => {
    return (
        <>
            <Header
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setLoading={setLoading}
                setTreeData={setTreeData} />
            {children}
        </>
    )
}

export default Layout