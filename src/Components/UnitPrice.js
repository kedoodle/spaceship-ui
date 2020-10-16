import React from "react";
import moment from "moment";

import { ResponsiveLine } from "@nivo/line";

export const UnitPrice = (props) => {
    var data = props.data;
    Object.keys(data).forEach(key => {
        data[key].x = data[key].date;
        data[key].y = data[key].aud_price;
        delete data[key].date;
        delete data[key].aud_price;
    });

    return (
        <ResponsiveLine
            data={[
                {
                    id: "Unit prices",
                    data: data
                }
            ]}
            margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
            xScale={{ format: "%Y-%m-%d", type: "time" }}
            xFormat={date => moment(date).format("DD MMM YYYY")}
            yScale={{ type: "linear", min: "auto"}}
            yFormat={price => `$${price}`}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                tickValues: "every 3 months",
                format: date => moment(date).format("MMM YYYY"),
                legend: "Date",
                legendOffset: 36,
                legendPosition: "middle"
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                format: price => `$${price.toFixed(2)}`,
                legend: "Unit price",
                legendOffset: -50,
                legendPosition: "middle"
            }}
            colors={{ scheme: "spectral" }}
            pointColor={{ theme: "background" }}
            useMesh
        />
    );
}
