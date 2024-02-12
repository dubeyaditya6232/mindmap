import { Box } from '@mui/material'
import React, { useState } from 'react'
import TreeComponent from './Tree/TreeComponent'
import SearchBox from './searchBox/SearchBox'
import Loading from './Loading'
import NotFound from './NotFound'

const Home = ({ searchValue, loading, treeData }) => {


    return (
        <>
            {searchValue ? !loading ? !treeData ? <NotFound /> : <TreeComponent treeData={treeData} /> : <Loading /> : <></>}
        </>
    )
}

export default Home