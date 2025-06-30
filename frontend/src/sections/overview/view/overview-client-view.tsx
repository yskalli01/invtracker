import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { _posts, _tasks, _traffic, _timeline } from 'src/_mock';

import { lazy, Suspense } from 'react';
import { useMetrics } from '../hooks/useClientMetrics';
import { useAuth } from 'src/context/auth-context';

const AnalyticsTasks = lazy( () => import('../components/analytics-tasks').then((module) => ({ default: module.AnalyticsTasks })) );
const AnalyticsCurrentVisits = lazy( () => import('../components/analytics-current-visits').then((module) => ({ default: module.AnalyticsCurrentVisits })) );
const AnalyticsOrderTimeline = lazy( () => import('../components/analytics-order-timeline').then((module) => ({ default: module.AnalyticsOrderTimeline })) );
const AnalyticsWebsiteVisits = lazy( () => import('../components/analytics-website-visits').then((module) => ({ default: module.AnalyticsWebsiteVisits })) );
const AnalyticsWidgetSummary = lazy( () => import('../components/analytics-widget-summary').then((module) => ({ default: module.AnalyticsWidgetSummary })) );
const AnalyticsTrafficBySite = lazy( () => import('../components/analytics-traffic-by-site').then((module) => ({ default: module.AnalyticsTrafficBySite })) );
const AnalyticsCurrentSubject = lazy( () => import('../components/analytics-current-subject').then((module) => ({ default: module.AnalyticsCurrentSubject })) );
const AnalyticsConversionRates = lazy( () => import('../components/analytics-conversion-rates').then((module) => ({ default: module.AnalyticsConversionRates })) );
const AnalyticsNews = lazy( () => import('../components/analytics-news').then((module) => ({ default: module.AnalyticsNews })) );




// ----------------------------------------------------------------------





export default function OverviewClientView() {

    const metrics = useMetrics();


  
    const categories = Object.keys(metrics.monthlyOrders);
    const lastMonth = categories[categories.length - 1];
    const previousMonth = categories[categories.length - 2];
    


    const lastOrderCount = metrics.monthlyOrders[lastMonth];
    const seriesOrderCount = categories.map(month => metrics.monthlyOrders[month] ?? 0);
    const denominatorOrderCount = (lastOrderCount + metrics.monthlyOrders[previousMonth] == 0) ? 1 : lastOrderCount + metrics.monthlyOrders[previousMonth];
    const orderIncrease = (lastOrderCount - metrics.monthlyOrders[previousMonth])
                        /(denominatorOrderCount) * 100;


    const lastPendingOrderCount = metrics.monthlyPendingOrders[lastMonth];
    const seriesPendingOrderCount = categories.map(month => metrics.monthlyPendingOrders[month] ?? 0);
    const denominatorPendingOrderCount = (lastPendingOrderCount + metrics.monthlyPendingOrders[previousMonth] == 0) ? 1 : lastPendingOrderCount + metrics.monthlyPendingOrders[previousMonth];
    const pendingOrderIncrease = (lastPendingOrderCount - metrics.monthlyPendingOrders[previousMonth])
                        /(denominatorPendingOrderCount) * 100;

    
    const lastConfirmedOrderCount = metrics.monthlyConfirmedOrders[lastMonth];
    const seriesConfirmedOrderCount = categories.map(month => metrics.monthlyConfirmedOrders[month] ?? 0);
    const denominatorConfirmedOrderCount = (lastPendingOrderCount + metrics.monthlyConfirmedOrders[previousMonth] == 0) ? 1 : lastConfirmedOrderCount + metrics.monthlyConfirmedOrders[previousMonth];
    const confirmedOrderIncrease = (lastConfirmedOrderCount - metrics.monthlyConfirmedOrders[previousMonth])
                        /(denominatorConfirmedOrderCount) * 100;


    const lastCancelleddOrderCount = metrics.monthlyCancelledOrders[lastMonth];
    const seriesCancelledOrderCount = categories.map(month => metrics.monthlyCancelledOrders[month] ?? 0);
    const denominatorCancelledOrderCount = (lastCancelleddOrderCount + metrics.monthlyCancelledOrders[previousMonth] == 0) ? 1 : lastCancelleddOrderCount + metrics.monthlyCancelledOrders[previousMonth];
    const cancelledOrderIncrease = (lastCancelleddOrderCount - metrics.monthlyCancelledOrders[previousMonth])
                        /(denominatorCancelledOrderCount) * 100;


    const lastOrdersCost = metrics.monthlyOrdersCost[lastMonth];
    const seriesOrdersCost = categories.map(month => metrics.monthlyOrdersCost[month] ?? 0);
    const denominatorOrdersCost = (lastOrdersCost + metrics.monthlyOrdersCost[previousMonth] == 0) ? 1 : lastOrdersCost + metrics.monthlyOrdersCost[previousMonth];
    const ordersCostIncrease = (lastOrdersCost - metrics.monthlyOrdersCost[previousMonth])
                        /(denominatorOrdersCost) * 100;

    
    const productCategories = Object.keys(metrics.productsByCategory);
    

   
  return (
    <>
      

      <Suspense fallback={<div>Loading dashboard...</div>}>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 2.4}}>
          <AnalyticsWidgetSummary
            title="Orders placed"
            percent={orderIncrease}
            total={lastOrderCount}
            chart={{
              categories: categories,
              series: seriesOrderCount,
            }}
          />
        </Grid>

         <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <AnalyticsWidgetSummary
            title="Pending"
            percent={pendingOrderIncrease}
            total={lastPendingOrderCount}
            color="secondary"
            chart={{
              categories: categories,
              series: seriesPendingOrderCount,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <AnalyticsWidgetSummary
            title="Confirmed"
            percent={confirmedOrderIncrease}
            total={lastConfirmedOrderCount}
            color="success"
            chart={{
              categories: categories,
              series: seriesConfirmedOrderCount,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <AnalyticsWidgetSummary
            title="Cancelled"
            percent={cancelledOrderIncrease}
            total={lastCancelleddOrderCount}
            color="error"
            chart={{
              categories: categories,
              series: seriesCancelledOrderCount,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 2.4 }}>
          <AnalyticsWidgetSummary
            title="Orders cost"
            percent={ordersCostIncrease}
            total={lastOrdersCost}
            color="success"
            chart={{
              categories: categories,
              series: seriesOrdersCost,
            }}
          />
        </Grid>
        
        
              
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Products purchased by category"
            chart={{
              series: productCategories.map(productCategory => ({ label: productCategory, value: metrics.productsByCategory[productCategory] }),) 
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Order timeline"
            tooltip='orders'
            chart={{
              categories: categories,
              series: [
                { name: 'Order count', data: seriesOrderCount},
              ],
            }}
          />
        </Grid>

        {/* <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsConversionRates
            title="Products by category"
            chart={{
              categories: productCategories,
              series: [
                { name: 'Count', data: seriesProductCategories },
              ],
            }}
          />
        </Grid>
        
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Warehouse utilisation"
            chart={{
              series: [
                { label: 'America', value: 3500 },
                { label: 'Asia', value: 2500 },
                { label: 'Europe', value: 1500 },
                { label: 'Africa', value: 500 },
              ],
            }}
          />
        </Grid>

        

        

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentSubject
            title="Current subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsNews title="News" list={_posts.slice(0, 5)} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsOrderTimeline title="Order timeline" list={_timeline} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsTrafficBySite title="Traffic by site" list={_traffic} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsTasks title="Tasks" list={_tasks} />
        </Grid> */}
      </Grid>
      </Suspense>
    </>
  );
}
