export class User{
    constructor(id,name,pincode,address,items){
        this.id = id;
        this.name=name;
        this.pincode=pincode;
        this.address=address;
        this.items=items;
    }
    toHTML(){
        return `
        ${this.id} 
        `
    }
}