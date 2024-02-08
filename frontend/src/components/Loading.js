import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
            <CircularProgress /> Loading....
        </Box>
    )
}

export default Loading