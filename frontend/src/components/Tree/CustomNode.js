import { Box, Button, Card, CardContent, IconButton, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CustomNode = ({ nodeDatum, toggleNode, ...props }) => {
    console.log(nodeDatum)
    return (
        <>
            <g>
                <foreignObject width="150" height="80" x="-75" y="-40" >
                    <Card
                        variant="outlined"
                        sx={{ bgcolor: "lightblue", textAlign: "center" }}>

                        <CardContent>

                            <Tooltip
                                title={
                                    <Typography
                                        variant="body1"
                                    >
                                        <Typography
                                            variant="h6" fontWeight="bold"
                                        >
                                            {nodeDatum.name}</Typography> {" "}{nodeDatum.attributes.description}
                                    </Typography>
                                }
                                arrow>
                                <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                    <Typography variant="h6" fontWeight="bold"
                                        sx={{
                                            whiteSpace: "nowrap", // Prevent text from wrapping
                                            overflow: "hidden",
                                            textOverflow: "ellipsis", // Add "..." if name is too long
                                            maxWidth: "100%",
                                        }}>
                                        {nodeDatum.name}
                                    </Typography>
                                    {/* <IconButton size="small" onClick={toggleNode}>
                                        {nodeDatum.children?.length > 0 ? !nodeDatum.__rd3t.collapsed ? <RemoveIcon /> : <AddIcon /> : null}
                                    </IconButton> */}
                                </Box>
                            </Tooltip>
                        </CardContent>

                    </Card>
                </foreignObject >
                {nodeDatum.children && (
                    <foreignObject width="30" height="30" x="60" y="-10">
                        <IconButton size="small" onClick={toggleNode} sx={{ bgcolor: "white", borderRadius: 1 }}>
                            {nodeDatum.__rd3t.collapsed ? <AddIcon fontSize="small" /> : <RemoveIcon fontSize="small" />}
                        </IconButton>
                    </foreignObject>
                )}
            </g>
        </>
    );
};

export default CustomNode;
