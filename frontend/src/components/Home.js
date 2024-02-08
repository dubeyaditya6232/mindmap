import { Box } from '@mui/material'
import React, { useState } from 'react'
import TreeComponent from './Tree/TreeComponent'
import SearchBox from './searchBox/SearchBox'
import Loading from './Loading'

const Home = () => {

    const [searchValue, setSearchValue] = useState(null)
    const [treeData, setTreeData] = useState(null)
    const [loading, setLoading] = useState(true)
    return (
        <>
            <Box sx={{
                border: '2px solid black',
                position: 'fixed', display: 'flex',
                justifyContent: 'center', alignItems: 'center',
                height: '10vh', width: "100%",
                zIndex: 500, background: 'grey'
            }}>
                <SearchBox
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    setLoading={setLoading}
                    setTreeData={setTreeData}
                />
            </Box>
            {searchValue ? !loading ? <TreeComponent treeData={treeData} /> : <Loading /> : <></>}
        </>
    )
}

export default Home