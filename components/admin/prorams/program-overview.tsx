"use client"

import DashboardHeaderText from '@/components/dashboard/dashboard-header'
import { addNewProgram } from '@/components/modal-helper'
import ProgramsColumn from '@/components/tables/columns/programs-column'
import ReuseableTable from '@/components/tables/reuseable-table'
import { Button } from '@/components/ui/button'
import { PROGRAMS_TABLE } from '@/data/table-data'
import React from 'react'

export default function ProgramOverview() {
  return (
    <div>
        <div className='flex justify-between items-center'>
       <DashboardHeaderText header='Programs ' subtext='Manage all learnings in one place' /> 
        <Button onClick={addNewProgram}>New Program</Button>
        </div>

        <div>
            <ReuseableTable columns={ProgramsColumn()} tableData={PROGRAMS_TABLE} />
        </div>
    </div>
  )
}
