// import NodeModal from "../components/NodeModal";
import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
// import { CustomNodeElementProps, RawNodeDatum, TreeNodeDatum } from "react-d3-tree/lib/types/common";
// import { v4 } from "uuid";

import Tree from "react-d3-tree"
import './treeComponent.css'
import data from '../../treeData.json'



const TreeComponent = ({ treeData }) => {
    // console.log(data)

    const [orientation, setOrientation] = useState('horizontal');
    const [ox, setOx] = useState(100)
    const [oy, setOy] = useState(50)
    const [prev, setPrev] = useState(null)

    const handleNodeClick = (datum) => {

        // if (prev !== datum.__rd3t.collapsed) {
        //     setPrev(datum.__rd3t.collapsed)
        //     if (datum.__rd3t.collapsed) {
        //         if (orientation === 'vertical') {
        //             setOy(oy + 50)
        //         }
        //         else {
        //             setOx(ox + 50)

        //         }
        //     } else {
        //         if (orientation === 'vertical') {
        //             setOy(oy - 50)
        //         }
        //         else {
        //             setOx(ox - 50)
        //         }
        //     }
        // }
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
        // console.log(nodeDatum)
        return (
            <>
                <g className="rd3t-label">
                    <rect width={30} height={30} x={-18} onClick={() => { onNodeClick(nodeDatum); toggleNode() }} />
                    <text
                        x="-1"
                        dy={orientation === 'vertical' ? "-2em" : "2em"}
                    // onClick={onNodeClick}
                    >
                        {nodeDatum.name.split(' ').map((word, index) => (
                            <tspan x="1em" dy={index === 0 ? "1.5em" : '1.2em'} key={index}>
                                {word}
                            </tspan>
                        ))}
                        {/* {nodeDatum.attributes &&
                            Object.entries(nodeDatum.attributes).map(([labelKey, labelValue], i) => (
                                <tspan key={`${labelKey}-${i}`}>
                                    {labelKey}: {labelValue}
                                </tspan>
                            ))} */}
                    </text>
                </g>
            </>
        );
    };


    useEffect(() => {

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

    useEffect(() => {

    }, [ox, oy])


    return (
        <> <Stack direction="row" spacing="md" sx={{}}>
            <Box sx={{ width: '100%', height: '90vh' }}>
                <Tree
                    data={treeData}
                    orientation={orientation}
                    dimensions={{
                        height: window.innerHeight,
                        width: window.innerWidth + 10
                    }}
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
                    rootNodeClassName="node__root"
                    branchNodeClassName="node__branch"
                    leafNodeClassName="node__leaf"
                />
            </Box>
        </Stack>
        </>
    );
}

export default TreeComponent 