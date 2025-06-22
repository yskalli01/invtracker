import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { _posts, _tasks, _traffic, _timeline } from 'src/_mock';

import { lazy, Suspense } from 'react';
import { useMetrics } from '../hooks/useMetrics';

const AnalyticsTasks = lazy( () => import('../analytics-tasks').then((module) => ({ default: module.AnalyticsTasks })) );
const AnalyticsCurrentVisits = lazy( () => import('../analytics-current-visits').then((module) => ({ default: module.AnalyticsCurrentVisits })) );
const AnalyticsOrderTimeline = lazy( () => import('../analytics-order-timeline').then((module) => ({ default: module.AnalyticsOrderTimeline })) );
const AnalyticsWebsiteVisits = lazy( () => import('../analytics-website-visits').then((module) => ({ default: module.AnalyticsWebsiteVisits })) );
const AnalyticsWidgetSummary = lazy( () => import('../analytics-widget-summary').then((module) => ({ default: module.AnalyticsWidgetSummary })) );
const AnalyticsTrafficBySite = lazy( () => import('../analytics-traffic-by-site').then((module) => ({ default: module.AnalyticsTrafficBySite })) );
const AnalyticsCurrentSubject = lazy( () => import('../analytics-current-subject').then((module) => ({ default: module.AnalyticsCurrentSubject })) );
const AnalyticsConversionRates = lazy( () => import('../analytics-conversion-rates').then((module) => ({ default: module.AnalyticsConversionRates })) );
const AnalyticsNews = lazy( () => import('../analytics-news').then((module) => ({ default: module.AnalyticsNews })) );




// ----------------------------------------------------------------------





export function OverviewAnalyticsView() {
  const metrics = useMetrics();
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
      </Typography>

      <Suspense fallback={<div>Loading dashboard...</div>}>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="In stock"
            percent={2.6}
            total={metrics.inStockCount}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Low stock"
            percent={-0.1}
            total={metrics.lowStockCount}
            color="secondary"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Zero stock"
            percent={2.8}
            total={metrics.zeroStockCount}
            color="warning"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Value of stock"
            percent={3.6}
            total={metrics.stockValue}
            color="error"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Earnings"
            percent={3.6}
            total={metrics.earnings}
            color="success"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Warehouse Utilisation"
            percent={3.6}
            total={metrics.warehouseUtil}
            color="info"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>
        
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Product count"
            percent={3.6}
            total={metrics.productCount}
            color="info"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>
              
        {/* <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Current visits"
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

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Website visits"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [
                { name: 'Team A', data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
                { name: 'Team B', data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsConversionRates
            title="Conversion rates"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Italy', 'Japan', 'China', 'Canada', 'France'],
              series: [
                { name: '2022', data: [44, 55, 41, 64, 22] },
                { name: '2023', data: [53, 32, 33, 52, 13] },
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
    </DashboardContent>
  );
}
