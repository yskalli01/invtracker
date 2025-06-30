import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { _posts, _tasks, _traffic, _timeline } from 'src/_mock';

import { lazy, Suspense } from 'react';
import { useMetrics } from '../hooks/useAdminMetrics';
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





export default function OverviewAdminView() {
  const metrics = useMetrics();


  
  const categories = Object.keys(metrics.monthlyProductsValue);
  const lastMonth = categories[categories.length - 1];
  const previousMonth = categories[categories.length - 2];


  const lastStockValue = metrics.monthlyProductsValue[lastMonth];
  const seriesStockValue = categories.map(month => metrics.monthlyProductsValue[month] ?? 0);
  const denominatorStockValue = (lastStockValue + metrics.monthlyProductsValue[previousMonth] == 0) ? 1 : lastStockValue + metrics.monthlyProductsValue[previousMonth];
  const stockValueIncrease = (lastStockValue - metrics.monthlyProductsValue[previousMonth])
                    /(denominatorStockValue) * 100;



  const lastInStockCount = metrics.monthlyInStockCount[lastMonth];
  const seriesInStockValue = categories.map(month => metrics.monthlyInStockCount[month] ?? 0);
  const denominatorInStock = (lastInStockCount + metrics.monthlyInStockCount[previousMonth] == 0) ? 1 : lastInStockCount + metrics.monthlyInStockCount[previousMonth];
  const inStockIncrease = (lastInStockCount - metrics.monthlyZeroStockCount[previousMonth])
  /(denominatorInStock) * 100;


  const lastLowStockCount = metrics.monthlyLowStockCount[lastMonth];
  const seriesLowStockValue = categories.map(month => metrics.monthlyLowStockCount[month] ?? 0);
  const denominatorLowStock = (lastLowStockCount + metrics.monthlyLowStockCount[previousMonth] == 0) ? 1 : lastLowStockCount + metrics.monthlyLowStockCount[previousMonth];
  const lowStockIncrease = (lastLowStockCount - metrics.monthlyLowStockCount[previousMonth])
  /(denominatorLowStock) * 100;


  const lastZeroStockCount = metrics.monthlyZeroStockCount[lastMonth];
  const seriesZeroStockValue = categories.map(month => metrics.monthlyZeroStockCount[month] ?? 0);
  const denominatorZeroStock = (lastZeroStockCount + metrics.monthlyZeroStockCount[previousMonth] == 0) ? 1 : lastZeroStockCount + metrics.monthlyZeroStockCount[previousMonth];
  const zeroStockIncrease = (lastZeroStockCount - metrics.monthlyZeroStockCount[previousMonth])
  /(denominatorZeroStock) * 100;
  


  const lastProductCount = metrics.monthlyProductCount[lastMonth];
  const seriesProductCountValue = categories.map(month => metrics.monthlyProductCount[month] ?? 0);
  const denominatorProductCount = (lastProductCount + metrics.monthlyProductCount[previousMonth] == 0) ? 1 : lastProductCount + metrics.monthlyProductCount[previousMonth];
  const productCountIncrease = (lastProductCount - metrics.monthlyProductCount[previousMonth])
  /(denominatorProductCount) * 100;

  const lastWarehouseUtil = metrics.monthlyWarehouseUtil[lastMonth];
  const seriesWarehouseUtil = categories.map(month => metrics.monthlyWarehouseUtil[month] ?? 0);
  const denominatorWarehouseUtil = (lastWarehouseUtil + metrics.monthlyWarehouseUtil[previousMonth] == 0) ? 1 : lastWarehouseUtil + metrics.monthlyWarehouseUtil[previousMonth];
  const warehouseUtilIncrease = (lastWarehouseUtil - metrics.monthlyWarehouseUtil[previousMonth])
  /(denominatorWarehouseUtil) * 100;


  const lastEarning = metrics.monthlyEarnings[lastMonth];
  const seriesEarnings = categories.map(month => metrics.monthlyEarnings[month] ?? 0);
  const denominatorEarning = (lastEarning + metrics.monthlyEarnings[previousMonth] == 0) ? 1 : lastEarning + metrics.monthlyEarnings[previousMonth];
  const earningIncrease = (lastEarning - metrics.monthlyEarnings[previousMonth])
  /(denominatorEarning) * 100;


  const lastOrderCount = metrics.monthlyOrders[lastMonth];
  const seriesOrders = categories.map(month => metrics.monthlyOrders[month] ?? 0);
  const denominatorOrder = (lastOrderCount + metrics.monthlyOrders[previousMonth] == 0) ? 1 : lastOrderCount + metrics.monthlyOrders[previousMonth];
  const orderIncrease = (lastOrderCount - metrics.monthlyOrders[previousMonth])
  /(denominatorOrder) * 100;
  

  const ordersCountries = Object.keys(metrics.ordersByCountry);

  const productCategories = Object.keys(metrics.productsByCategory);
  const seriesProductCategories = productCategories.map(productCategory => metrics.productsByCategory[productCategory]);
   
  return (
    <>
      

      <Suspense fallback={<div>Loading dashboard...</div>}>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="In stock"
            percent={inStockIncrease}
            total={lastInStockCount}
            chart={{
              categories: categories,
              series: seriesInStockValue,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Low stock"
            percent={lowStockIncrease}
            total={lastLowStockCount}
            color="secondary"
            chart={{
              categories: categories,
              series: seriesLowStockValue,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Zero stock"
            percent={zeroStockIncrease}
            total={lastZeroStockCount}
            color="warning"
            chart={{
              categories: categories,
              series: seriesZeroStockValue,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Value of stock"
            percent={stockValueIncrease}
            total={lastStockValue}
            color="error"
            chart={{
              categories: categories,
              series: seriesStockValue,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Earnings"
            percent={earningIncrease}
            total={lastEarning}
            color="success"
            chart={{
              categories: categories,
              series: seriesEarnings,
            }}
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Warehouse Utilisation"
            percent={warehouseUtilIncrease}
            total={lastWarehouseUtil}
            color="info"
            chart={{
              categories: categories,
              series: seriesWarehouseUtil,
            }}
          />
        </Grid>
        
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Product count"
            percent={productCountIncrease}
            total={lastProductCount}
            color="info"
            chart={{
              categories: categories,
              series: seriesProductCountValue,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Orders count"
            percent={orderIncrease}
            total={lastOrderCount}
            chart={{
              categories: categories,
              series: seriesOrders,
            }}
          />
        </Grid>
              
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Orders by country"
            chart={{
              series: ordersCountries.map(orderCountry => ({ label: orderCountry, value: metrics.ordersByCountry[orderCountry] }),) 
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
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
        
        {/* <Grid size={{ xs: 12, md: 6, lg: 4 }}>
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
