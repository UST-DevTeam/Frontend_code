import React from 'react'
import AdvancedTable from '../../../../components/AdvancedTable';
import Button from '../../../../components/Button';

const OhsNitification = () => {
  const table = {
    columns: [
      {
        name: "Milestone",
        value: "Milestone",
        style: "text-center min-w-[100px]",
      },
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [],
  };
  return (
    <div className=''>
      <AdvancedTable
        headerButton={
          <div className="flex gap-2">
            <Button
              name={"Add New"}
              classes="w-auto"
              onClick={()=>{}}
            />
          </div>
        }
        table={table}
        
        tableName="OHS Notifications"
        TableHeight="h-[68vh]"
        
        data={[]}
        
        totalCount={0}
        heading="Total Count :-"
     
      />
    </div>
  )
}

export default OhsNitification
