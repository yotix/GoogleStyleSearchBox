
function findItems(search,items){
    let total=0;
    for(let item of items){
        if(item.toLowerCase().search(search)>-1  && search)
        total+=1;
    }
    return total
}

export {
    findItems
}