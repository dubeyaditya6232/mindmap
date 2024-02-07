// import NodeModal from "../components/NodeModal";
import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios'
// import { CustomNodeElementProps, RawNodeDatum, TreeNodeDatum } from "react-d3-tree/lib/types/common";
// import { v4 } from "uuid";

import Tree from "react-d3-tree"
import './treeComponent.css'
import data from '../../treeData.json'

console.log(data)


const TreeComponent = () => {

    const [loading, setLoading] = useState(true)

    const [treeData, setTreeData] = useState(null)

    const handleNodeClick = (datum) => {

    };

    const textLayout = {
        vertical: {
            title: {
                textAnchor: 'start',
                x: 40,
            },
            attributes: {},
            attribute: {
                x: 40,
                dy: '1.2em',
            },
        },
        horizontal: {
            title: {
                y: 40,
            },
            attributes: {
                textAnchor: 'start',
                x: 0,
                y: 40,
            },
            attribute: {
                x: 0,
                dy: '1.2em',
            },
        },
    };
    const renderRectSvgNode = (customProps, onNodeClick) => {
        const { nodeDatum, toggleNode } = customProps;
        // const isRoot = nodeDatum.attributes?.id === tree.attributes?.id;
        return (
            <><circle r={20} onClick={toggleNode}></circle>
                <g className="rd3t-label">
                    <text
                        x="-1"
                        dy={orientation === 'vertical' ? "-2em" : "2em"}
                        onClick={onNodeClick}
                    >
                        {nodeDatum.name}
                        {/* {nodeDatum.attributes &&
                            Object.entries(nodeDatum.attributes).map(([labelKey, labelValue], i) => (
                                <tspan key={`${labelKey}-${i}`}>
                                    {labelKey}: {labelValue}
                                </tspan>
                            ))} */}
                    </text>
                </g></>
        );
    };

    const [orientation, setOrientation] = useState('horizontal');
    const [ox, setOx] = useState(100)
    const [oy, setOy] = useState(50)

    const fetchData = async () => {
        setLoading(true)
        try {
            console.log(`${process.env.REACT_APP_server_url}data`)
            const response = await axios.get(`${process.env.REACT_APP_server_url}data`)
            if (response) {
                setTreeData(response.data)
            }
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }
    useEffect(() => {

        fetchData();

        const handleResize = () => {
            // Check the screen width and update the orientation
            const newOrientation = window.innerWidth < 600 ? 'vertical' : 'horizontal';
            setOrientation(newOrientation);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial orientation check
        handleResize();

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>{loading ? <></> : <Stack direction="row" spacing="md" sx={{}}>
            <Box sx={{ border: '2px solid black', width: '100%', height: '100vh' }}>
                <Tree
                    data={treeData}
                    orientation={orientation}
                    // dimensions={{
                    //     height: 50,
                    //     width: 50
                    // }}
                    centeringTransitionDuration={500}
                    translate={{
                        x: window.innerWidth / 2 - ((orientation === 'vertical') ? 0 : ox),
                        // x: window.innerWidth / 2 - 50,
                        y: window.innerHeight / 2 - ((orientation === 'vertical') ? oy : 50),
                    }}
                    collapsible={true}
                    shouldCollapseNeighborNodes={true}
                    initialDepth={1}
                    depthFactor={undefined}
                    zoomable={true}
                    draggable={true}
                    zoom={1}
                    // scaleExtent={{ min: 0.1, max: 1 }}
                    separation={{ siblings: 0.5, nonSiblings: 0.7 }}
                    nodeSize={{ x: 200, y: 200 }}
                    enableLegacyTransitions={false}
                    transitionDuration={500}
                    renderCustomNodeElement={(nodeInfo) =>
                        renderRectSvgNode(nodeInfo, handleNodeClick)
                    }
                />
                {/* <NodeModal
          onSubmit={(familyMemberName) => handleSubmit(familyMemberName)}
          onClose={close}
          isOpen={Boolean(node)}
        /> */}
            </Box>
        </Stack>
        }
        </>
    );
}

export default TreeComponent 