import React, { useState } from 'react'
import PageLayout from '@/components/page-layout'
import { DateRangeType } from '@/@types/analytic';
import DashboardSummary from '../../components/dashboard/dashboard-summary';
import AnalyseDataChart from "./_components/analyse-data-chart"
import ExpensePieChart from "./_components/expense-pie-chart"

const Analyse = () => {

   const [dateRange, _setDateRange] = useState<DateRangeType>(null);

   return (
      <div className="w-full flex flex-col">
         <PageLayout className="space-y-6"
            renderPageHeader={
               <DashboardSummary
                  dateRange={dateRange}
                  setDateRange={_setDateRange}
                  title={`Saving analysis`}
                  subtitle={"All data is computed as of previous/present transaction"}
               />
            }
         >
            <div className="w-full grid grid-cols-1 gap-8">
               <div className="col-span-4">
                  <AnalyseDataChart dateRange={dateRange} />
               </div>
               {/* <div className="col-span-4">
                  <ExpensePieChart dateRange={dateRange} />
               </div> */}
            </div>
         </PageLayout>

      </div>
   )
}

export default Analyse
