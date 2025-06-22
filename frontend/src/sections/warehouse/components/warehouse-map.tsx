import { ReactNode } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

interface WarehouseMapProps {
    children?: ReactNode;
}


export function WarehouseMap({children}:WarehouseMapProps){
    const defaultCenter: [number, number] = [33.5731, -7.5898]; // Casablanca center
    const defaultZoom = 2;
    return(
        <MapContainer
            center={defaultCenter} 
            zoom={defaultZoom}
            style={{
                height: "100%",
                width: "100%",
                position: "relative",
                zIndex: 0,
            }}
            scrollWheelZoom={true} 
            dragging={true}          
            doubleClickZoom={true}   
            zoomControl={true} 
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {children}
        </MapContainer>
    )
}