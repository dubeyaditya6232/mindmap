import { Box, Typography } from '@mui/material'
import React from 'react'
import SearchBox from '../searchBox/SearchBox'

const Header = ({ searchValue, setSearchValue, setLoading, setTreeData }) => {
    return (
        <Box sx={{
            position: 'fixed', display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '8vh', width: "100%",
            zIndex: 500, background: 'grey',
        }}>
            <Box sx={{ mx: 1 }}>
                <Typography variant='h5'>
                    Extractor
                </Typography>
            </Box>
            <Box sx={{ mx: 2 }}>
                <SearchBox
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    setLoading={setLoading}
                    setTreeData={setTreeData}
                />
            </Box>

        </Box>
    )
}

export default Header