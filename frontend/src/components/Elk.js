import React, { useState, useEffect } from "react";
import ReactFlow, { MiniMap, Controls } from "reactflow";
import ELK from "elkjs/lib/elk.bundled.js";
import 'reactflow/dist/style.css';


const elk = new ELK();

const initialData = {
    id: "1",
    label: "Main Topic",
    children: [
        {
            id: "2",
            label: "Subtopic 1",
            children: [
                { id: "21", label: "Detail 1", children: [] },
                { id: "22", label: "Detail 2", children: [] },
                {
                    id: "23", label: "Detail 2", children: [
                        { id: "231", label: "Detail 1", children: [] },
                        { id: "232", label: "Detail 2", children: [] },
                    ]
                },
                { id: "24", label: "Detail 2", children: [] }
            ]
        },
        { id: "3", label: "Subtopic 2", children: [] },
        { id: "4", label: "Detail 1", children: [
            { id: "41", label: "Detail 1", children: [] },
            { id: "42", label: "Detail 2", children: [] },
        ] },
        { id: "5", label: "Detail 2", children: [] },
    ]
};

// Convert JSON data to nodes & edges
const processMindMap = (data, parent = null) => {
    let nodesArray = [];
    let edgesArray = [];

    const currentNode = {
        id: data.id,
        data: { label: data.label },
        position: { x: 0, y: 0 }
    };
    nodesArray.push(currentNode);

    if (parent) {
        edgesArray.push({ id: `e${parent.id}-${data.id}`, source: parent.id, target: data.id });
    }

    data.children.forEach((child) => {
        const { nodes, edges } = processMindMap(child, data);
        nodesArray = [...nodesArray, ...nodes];
        edgesArray = [...edgesArray, ...edges];
    });

    return { nodes: nodesArray, edges: edgesArray };
};

// Function to apply ELK.js layout
const applyELKLayout = async (nodes, edges) => {
    const graph = {
        id: "root",
        layoutOptions: {
            "elk.algorithm": "radial", // Options: "layered", "force", "radial","stress"
            // "elk.direction": "DOWN", // Change to "UP", "DOWN", "LEFT", etc.
            // "elk.spacing.nodeNode": 1, // The minimum space between two nodes
            // "elk.spacing.edgeNode": 1, // The minimum space between an edge and a node
            // "elk.spacing.edgeEdge": 1,
            // "elk.radial.layout": "true",
            // "elk.stress.desiredEdgeLength": 20,
            // "elk.radial.centerOnRoot": true, //NW
            // "elk.radial.compactor": "RADIAL_COMPACTION", //W
            // "elk.radial.compactionStepSize": 5, //w
            // "elk.portLabels.placement":"ALWAYS_SAME_SIDE", //NW
            // "elk.radial.orderId":1,//NW
            // "elk.radial.rotation.outgoingEdgeAngles":true, //NW
            // "elk.radial.optimizationCriteria":"EDGE_LENGTH", //W
            // "elk.radial.sorter":"POLAR_COORDINATE (@AdvancedPropertyValue)", //NW
            // "elk.radial.rotation.computeAdditionalWedgeSpace": true,//NW
            // "elk.radial.wedgeCriteria": "LEAF_NUMBER",//NW
            // "elk.radial.rotate":true,//NW
            "elk.portConstraints":"FREE" //NW
        },
        children: nodes.map((node) => ({
            id: node.id,
            width: 180,
            height: 60
        })),
        edges: edges.map((edge) => ({
            id: edge.id,
            sources: [edge.source],
            targets: [edge.target]
        }))
    };

    const layoutedGraph = await elk.layout(graph);
    return nodes.map((node) => {
        const layoutNode = layoutedGraph.children.find((n) => n.id === node.id);
        return { ...node, position: { x: layoutNode.x, y: layoutNode.y } };
    });
};

const MindMap = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    useEffect(() => {
        const { nodes, edges } = processMindMap(initialData);
        applyELKLayout(nodes, edges).then((layoutedNodes) => {
            setNodes(layoutedNodes);
            setEdges(edges);
        });
    }, []);

    return (
        <div style={{ width: "100vw", height: "90vh" }}>
            <ReactFlow nodes={nodes} edges={edges}>
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default MindMap;
