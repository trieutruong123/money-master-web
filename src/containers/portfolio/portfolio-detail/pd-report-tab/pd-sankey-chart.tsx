import { Box } from "@mui/material";
import { SankeyDataLink } from "shared/types";
import { Sankey } from "../pd-insight-chart/sankey-chart";


interface IProps {
    sankeyFlowData: SankeyDataLink[]

}

const PDSankeyChart = ({ sankeyFlowData }: IProps) => {
    return (
        <Box width='100%'>
            <Sankey sankeyFlowData={sankeyFlowData} />
        </Box >
    )
}
export default PDSankeyChart;
