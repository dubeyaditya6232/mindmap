import { Box, Tooltip } from '@mui/material';
import { Handle, Position } from '@xyflow/react';
import React from 'react'

const CustomNode = ({ data }) => {
    return (
        <Tooltip arrow title="absbasajs dkasjaks dnaksnaksna">
            <Box sx={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', }}>

                <Box>{data.label}</Box>
                {!data.isRoot && <Handle type="target" position={Position.Left} />}
                {data.hasChildren && <Handle type="source" position={Position.Right} />}
            </Box>
        </Tooltip>
    );
};

export default CustomNode