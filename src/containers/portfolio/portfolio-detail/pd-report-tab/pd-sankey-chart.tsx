import { Box, Card, CardContent, CardHeader, useTheme, useMediaQuery } from "@mui/material";
import { SankeyDataLink } from "shared/types";
import { Sankey } from "../pd-insight-chart/sankey-chart";


interface IProps {
    sankeyFlowData: SankeyDataLink[]
    content: any
}

const PDSankeyChart = ({ content, sankeyFlowData }: IProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <Box width='100%'>
            <Card
                sx={{
                    borderRadius: '12px',
                    padding: isMobile ? '5px 0px 0px 10px' : '5px 20px 20px 20px',
                    boxShadow: '0 0 8px rgba(0,0,0,0.11)',
                    height: '100%',
                    width: '100%',
                }}
            >
                <CardHeader
                    title={`${content.title}`}
                    sx={{ height: '3rem', padding: '0px' }}
                />

                <CardContent sx={{ padding: 0, width: '100%', height: 'auto' }}>
                    <Sankey sankeyFlowData={sankeyFlowData} />
                </CardContent>
            </Card>
        </Box >
    )
}
export default PDSankeyChart;
