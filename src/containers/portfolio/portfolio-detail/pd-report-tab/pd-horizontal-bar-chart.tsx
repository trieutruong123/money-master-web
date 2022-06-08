import { PieChartItem } from "shared/models";
import { HorizontalBarChart } from "../pd-insight-chart";

interface IProps {
    content: any;
    pieChartData: PieChartItem[];
}

const PDHorizontalBarChart = ({ content, pieChartData }: IProps) => {

    return (
        <>
            <HorizontalBarChart
                content={content.assetAllocation}
                pieChartData={pieChartData}
            ></HorizontalBarChart>
        </>
    );
}

export default PDHorizontalBarChart;