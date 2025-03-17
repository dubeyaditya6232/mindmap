import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ReactFlow, Controls, ReactFlowProvider } from "@xyflow/react";
import ELK from "elkjs/lib/elk.bundled.js";
import '@xyflow/react/dist/style.css'; import CustomNode from "./CustomNode";
;


const elk = new ELK();

const initialData = {
    "id": "1",
    "label": "Cloud Computing",
    "children": [
        {
            "id": "2",
            "label": "Service Models",
            "children": [
                {
                    "id": "21",
                    "label": "IaaS",
                    "children": [
                        { "id": "211", "label": "Compute", "children": [] },
                        { "id": "212", "label": "Storage", "children": [] },
                        { "id": "213", "label": "Networking", "children": [] }
                    ]
                },
                {
                    "id": "22",
                    "label": "PaaS",
                    "children": [
                        { "id": "221", "label": "Development Tools", "children": [] },
                        { "id": "222", "label": "Database Management", "children": [] }
                    ]
                },
                {
                    "id": "23",
                    "label": "SaaS",
                    "children": [
                        { "id": "231", "label": "Email Services", "children": [] },
                        { "id": "232", "label": "Customer Relationship Management", "children": [] }
                    ]
                }
            ]
        },
        {
            "id": "3",
            "label": "Deployment Models",
            "children": [
                { "id": "31", "label": "Public Cloud", "children": [] },
                { "id": "32", "label": "Private Cloud", "children": [] },
                { "id": "33", "label": "Hybrid Cloud", "children": [] }
            ]
        },
        {
            "id": "4",
            "label": "Key Concepts",
            "children": [
                { "id": "41", "label": "Scalability", "children": [] },
                { "id": "42", "label": "Elasticity", "children": [] },
                { "id": "43", "label": "Pay-as-you-go", "children": [] }
            ]
        },
        {
            "id": "5",
            "label": "Security",
            "children": [
                { "id": "51", "label": "Data Encryption", "children": [] },
                { "id": "52", "label": "Identity and Access Management", "children": [] },
                { "id": "53", "label": "Compliance", "children": [] }
            ]
        }
    ]
};


// Function to apply ELK.js layout
const applyELKLayout = async (nodes, edges) => {
    const graph = {
        id: "root",
        layoutOptions: {
            "elk.algorithm": "layered", // Options: "layered", "force", "radial","stress"
            "elk.direction": "RIGHT", // Change to "UP", "DOWN", "LEFT", etc.
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
            "elk.portConstraints": "FREE" //NW
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
    const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [expandedNodes, setExpandedNodes] = useState(new Set(["1"])); // Root is always expanded

    // Convert JSON data to nodes & edges
    const processMindMap = (data, parent = null, expandedNodes) => {
        let nodesArray = [];
        let edgesArray = [];

        const isVisible = expandedNodes.has(data.id) || data.id === "1"; // Root node always visible  
        const currentNode = {
            id: data.id,
            data: { label: data.label, isRoot: parent ? false : true, hasChildren: data.children.length > 0 },
            type: "custom",
            position: { x: 0, y: 0 }
        };

        nodesArray.push(currentNode);

        if (parent) {
            edgesArray.push({
                id: `e${parent.id}-${data.id}`,
                source: parent.id,
                target: data.id,
            });
        }

        if (isVisible) {
            data.children.forEach((child) => {
                const { nodes, edges } = processMindMap(child, data, expandedNodes);
                nodesArray = [...nodesArray, ...nodes];
                edgesArray = [...edgesArray, ...edges];
            });
        }

        return { nodes: nodesArray, edges: edgesArray };
    };

    const updateLayout = () => {
        const { nodes: newNodes, edges: newEdges } = processMindMap(initialData, null, expandedNodes);
        applyELKLayout(newNodes, newEdges).then((layoutedNodes) => {
            setNodes(layoutedNodes);
            setEdges(newEdges);
        });
    };

    const onNodeClick = useCallback((event, node) => {
        setExpandedNodes((prev) => {
            const newExpanded = new Set(prev);
            if (newExpanded.has(node.id)) {
                newExpanded.delete(node.id);
            } else {
                newExpanded.add(node.id);
            }
            return newExpanded;
        });
        updateLayout();
    }, []);



    useEffect(() => {
        updateLayout();

    }, [expandedNodes]);

    return (
        <ReactFlowProvider>
            <div style={{ width: "100vw", height: "90vh" }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodeClick={onNodeClick}
                    fitView
                    nodeTypes={nodeTypes}
                >
                    <Controls />
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    );
};

export default MindMap;
