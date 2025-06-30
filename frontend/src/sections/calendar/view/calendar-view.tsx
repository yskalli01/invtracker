import { PageHeader } from "src/components/pageHeader";
import { DashboardContent } from "src/layouts/dashboard";
import 'src/global.css';
import {
    ScheduleComponent,
    Day,
    Week,
    Month,
    Inject,
    ViewsDirective,
    ViewDirective,
    DragAndDrop,
    Resize,
  } from '@syncfusion/ej2-react-schedule';
import { registerLicense } from "@syncfusion/ej2-base";
import { DataManager,  UrlAdaptor, Query, DataResult } from '@syncfusion/ej2-data';
import { Box } from "@mui/material";


registerLicense(process.env.SYNCFUSION_KEY || '');

class CustomUrlAdaptor extends UrlAdaptor {
    // Override processResponse to convert timestamps to Date for GET requests
    processResponse(
      response: Object | Object[],
      request: Request,
      query: Query,
      xhr?: XMLHttpRequest,
      requestOptions?: { url?: string }
    ): DataResult | Object[] {
      if (requestOptions?.url === 'http://localhost:8080/events/getData') {
        let data = super.processResponse(response, request, query, xhr, requestOptions);
  
        if (Array.isArray(data)) {
          data = data.map(event => ({
            ...event,
            starttime: new Date(event.starttime),
            endtime: new Date(event.endtime),
            isallday: event.isallday ?? false,
          }));
        }
  
        return data;
      }
  
      return super.processResponse(response, request, query, xhr, requestOptions);
    }
  
    // Override processRequest to convert Date objects to timestamps on insert/update
    processRequest(
      dm: DataManager,
      action: string,
      query: Query,
      data?: Object | Object[],
      changes?: Object,
      e?: Object
    ): string {
      if (action === 'insert' || action === 'update') {
        const events = Array.isArray(data) ? data : [data];
        events.forEach(event => {
          if (event && event.hasOwnProperty('starttime') && event.starttime instanceof Date) {
            (event as any).starttime = (event as any).starttime.getTime();
          }
          if (event && event.hasOwnProperty('endtime') && event.endtime instanceof Date) {
            (event as any).endtime = (event as any).endtime.getTime();
          }
        });
        return super.processRequest(dm, action, query, events, changes, e);
      }
      return super.processRequest(dm, action, query, data, changes, e);
    }
}
  

export function CalendarView(){  
    const dataManager = new DataManager({
        url: 'http://localhost:8080/events/getData',
        crudUrl: 'http://localhost:8080/events/crudActions',
        adaptor: new CustomUrlAdaptor(),
        crossDomain: true
    });
    return(
        <DashboardContent>
            <PageHeader title='Calendar'/>
            <Box 
                sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',     
              }}
            >
            <ScheduleComponent
                height={500}
                width="100%"
                currentView="Month"
                allowDragAndDrop={true}
                allowResizing={true}
                showQuickInfo={true}
                eventSettings=
                {{   
                    allowAdding:true,
                    allowDeleting:true,
                    allowEditing:true,
                    dataSource: dataManager,
                    fields: {
                        id: 'id',
                        subject: { name: 'subject' },
                        isAllDay: { name: 'isallday' },
                        location: { name: 'location' },
                        description: { name: 'description' },
                        startTime: { name: 'starttime' },
                        endTime: { name: 'endtime' },
                        startTimezone: { name: 'starttimezone' },
                        endTimezone: { name: 'endtimezone' },
                        recurrenceID: { name: 'recurrenceid' },
                        recurrenceRule: { name: 'recurrencerule' },
                        recurrenceException: { name: 'recurrenceexception' },
                        followingID: 'followingID'
                      }                     

                }}
            >
                <ViewsDirective>
                    <ViewDirective option="Day" />
                    <ViewDirective option="Week" />
                    <ViewDirective option="Month" />
                </ViewsDirective> 
                
                <Inject services={[Day, Week, Month, DragAndDrop, Resize]} />
            </ScheduleComponent> 
            </Box>
            
        </DashboardContent>
    )
}