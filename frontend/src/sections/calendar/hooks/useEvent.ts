import { useCRUD } from "src/hooks/useCRUD";
import { EventProps } from "../config";
import { useCallback, useEffect, useState } from "react";
import { axios } from "src/api";
import { notify } from "src/utils/toast-helper";



const parseDate = (val: any) => Array.isArray(val) ? new Date(...val) : new Date(val);

export function useEvent() {
    const messages = {
      createSuccess : 'Event created successfully',
      updateSuccess : 'Event updated successfully',
      deleteSuccess : 'The event has been deleted successfully',
      deleteAllSuccess : "Events have been deleted successfully"
    }
    
    const [events,setEvents] = useState<EventProps>();

    useEffect(() => {
      fetchEvents();
    }, []);
  
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/events');
        const transformed = res.data.map((event: any) => ({
          Id: event.id,
          Subject: event.subject,
          StartTime: parseDate(event.startTime),
          EndTime: parseDate(event.endTime),
          IsAllDay: event.isAllDay,
          Location: event.location,
          Description: event.description,
          RecurrenceRule: event.recurrenceRule,
          RecurrenceID: event.recurrenceID,
          RecurrenceException: event.recurrenceException,
          FollowingID: event.followingID,
          StartTimezone: event.startTimezone,
          EndTimezone: event.endTimezone,
          CategoryColor: event.categoryColor,
          IsReadonly: event.isReadonly,
          Status: event.status,
          Priority: event.priority,
          UserId: event.userId
        }));

        console.log(transformed);
        setEvents(transformed);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };
  
  
    const createEvent = useCallback(async (data: EventProps) => {
      try {
        const eventData = {
          id: data.Id,
          subject: data.Subject,
          startTime: data.StartTime,
          endTime: data.EndTime,
          isAllDay: data.IsAllDay,
          location: data.Location,
          description: data.Description,
          recurrenceRule: data.RecurrenceRule,
          recurrenceID: data.RecurrenceID,
          recurrenceException: data.RecurrenceException,
          followingID: data.FollowingID,
          startTimezone: data.StartTimezone,
          endTimezone: data.EndTimezone,
          categoryColor: data.CategoryColor,
          isReadonly: data.IsReadonly,
          status: data.Status,
          priority: data.Priority,
          userId: data.UserId,
        };
  
    
        const response = await axios.post("events", eventData);
    
        notify(messages.createSuccess, "success");
        setEvents((prev) => [...prev, response.data]);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }, []);

    const modifyEvent = useCallback(async (data: EventProps, id : number) => {
      try {
        const eventData = {
          subject: data.Subject,
          startTime: data.StartTime,
          endTime: data.EndTime,
          isAllDay: data.IsAllDay,
          location: data.Location,
          description: data.Description,
          recurrenceRule: data.RecurrenceRule,
          recurrenceID: data.RecurrenceID,
          recurrenceException: data.RecurrenceException,
          followingID: data.FollowingID,
          startTimezone: data.StartTimezone,
          endTimezone: data.EndTimezone,
          categoryColor: data.CategoryColor,
          isReadonly: data.IsReadonly,
          status: data.Status,
          priority: data.Priority,
          userId: data.UserId,
        };
  
    
        const response = await axios.put(`events/${id}`, eventData);
    
        notify(messages.updateSuccess, "success");
        setEvents((prev) => [...prev, response.data]);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }, []);
  
    // const modifyProduct = useCallback(async (data: ProductProps, filePath: File | null, id : number) => {
    //   try {
    //     const formData = new FormData();
    
    //     // Build a product object (as expected by backend)
    //     let productData = {
    //       name: data.name,
    //       category: data.category,
    //       description: data.description,
    //       warehouse: data.warehouse,
    //       supplier: data.supplier,
    //       unitPrice: data.unitPrice,
    //       purchasePrice : data.purchasePrice,
    //       quantity: data.quantity,
    //     };
    
        
    
    //     if (filePath) {
    //       formData.append("image", filePath); // ✅ must match @RequestPart("image")
    //     }
    //     else{
    //       productData = {...(productData as any), imagePath : data.imagePath};
    //     }
  
    //     formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));
  
       
    //     const response = await axios.patch(`products/${id}`, formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     });
    //     console.log("The updated product",response);
    
    //     notify(messages.updateSuccess, "success");
    //     setEvent((prev) =>
    //       prev.map((product) =>
    //         product && product.id === id
    //           ? { ...response.data, averageRating: product.averageRating } 
    //           : product
    //       )
    //     );
      
    //     return true;
    //   } catch (error) {
    //     console.log(error);
    //     return false;
    //   }
    // }, []);
    
    
    return{
      events,
      createEvent,
      modifyEvent,
      // deleteEvent,
      // deleteEvents
    }
  }
  