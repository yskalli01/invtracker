import { JSX, LazyExoticComponent, lazy } from "react";



const OverviewAdminView = lazy( ()=> import("./view/overview-admin-view"));
const OverviewClientView = lazy( ()=> import("./view/overview-client-view"));


export const roleViews : {
    ADMIN : LazyExoticComponent<() => JSX.Element>
    CLIENT : LazyExoticComponent<() => JSX.Element>
} = {
    ADMIN : OverviewAdminView,
    CLIENT : OverviewClientView
}
