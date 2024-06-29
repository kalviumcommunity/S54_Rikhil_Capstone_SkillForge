import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  showProgress: true,
  steps: [
    { element: '#logo', popover: { title: 'Logo of the website', description: 'This is the main logo display of the website.', side: "left", align: 'start' }},
    { element: '.opts', popover: { title: 'Main options!', description: 'All main options to navigate on major pages of the website.', side: "left", align: 'start' }},
    { element: '.opt-1', popover: { title: 'Main options!', description: 'All main options to navigate on major pages of the website.', side: "bottom", align: 'center' }},
    { element: '.opt-2', popover: { title: 'Main options!', description: 'All main options to navigate on major pages of the website.', side: "bottom", align: 'center' }},
    { element: '.opt-3', popover: { title: 'Main options!', description: 'All main options to navigate on major pages of the website.', side: "bottom", align: 'center' }},
  ]
});

export const trigger = ()=>{
    driverObj.drive()
}