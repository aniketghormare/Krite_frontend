import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip } from 'recharts';
//import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
function Chart({ data, loading, error }) {

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    //console.log(data)
    return (
        <div style={{ height: "500px", width: "500px", border: "1px solid teal", margin: "auto", textAlign: "center" }}>
            <h2 style={{ color: "teal" }}>Domain Distribution</h2>
            <PieChart width={400} height={400}>
                <Pie dataKey="value" data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
                <Tooltip />
            </PieChart>
        </div>

    );
}

export default Chart;
