export interface User {
    id:number;
    name:string;
    username:string;
    email:string;
    address:{
        street:string;
     
        city:string;
        zipCode:string;
     
    };
    phone:string;
    website:string;
    company:{
        name:string;
    }
}