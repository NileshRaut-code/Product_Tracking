import React from "react";
import HeatMap from '@uiw/react-heat-map';

const SubmissionMap = ({ submissionData }) => {

    
  const formattedData = Object.entries(submissionData).map(([timestamp, count]) => {
    const date = new Date(timestamp * 1000).toISOString().split("T")[0]; // "YYYY-MM-DD"
    return { date, count };
  });
  console.log(formattedData);

  return (
    <HeatMap
      value={formattedData}
      width={880}
       fontSize={20}
    space={4}
    rectSize={15}
    //   monthPlacement={"bottom"}
      style={{ color: '#eff2f699', '--rhm-rect-active': '#eff2f699' }}
      startDate={new Date('2024/01/01')}
      panelColors={['#393939', '#7fe18b', '#109932','#016620']}
      legendRender={(props) => (
        <rect {...props} y={props.y + 10} rx={3} />
      )}
      rectProps={{
        rx: 3
      }}

    />
  )
};

export default SubmissionMap;
