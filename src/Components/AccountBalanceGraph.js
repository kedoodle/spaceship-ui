import React from "react";
import moment from "moment";
import { ResponsiveLine } from "@nivo/line";

import { formatAud } from "../utils/Formatter"

function AccountBalanceGraph(props) {
    var data = props.data;
    if (!data) return null;
    Object.keys(data).forEach(key => {
        data[key].x = data[key].date;
        data[key].y = data[key].balance;
    });

    return (
        <ResponsiveLine
            data={[
                {
                    id: "Balance",
                    data: data
                }
            ]}
            margin={{ top: 1, right: 0, bottom: 1, left: 0 }}
            xScale={{ format: "%Y-%m-%d", type: "time" }}
            xFormat={date => moment(date).format("DD MMM YYYY")}
            yScale={{ type: "linear", min: "auto"}}
            yFormat={balance => formatAud(balance)}
            axisBottom={null}
            axisLeft={null}
            enableGridX={false}
            enableGridY={false}
            colors={{ scheme: "spectral" }}
            pointColor={{ theme: "background" }}
            enableCrosshair={false}
            useMesh={true}
        />
    );
}

export default AccountBalanceGraph;
