import { PieChartItem } from "shared/models";
import { DonutChart } from "../pd-insight-chart";

interface IProps {
    content: any;
    pieChartData: PieChartItem[];
}

const PDDonutchart = ({ content, pieChartData }: IProps) => {
    return (
        <>
            <DonutChart
                content={content.assetAllocation}
                pieChartData={pieChartData}
            /></>
    );
}

export default PDDonutchart;