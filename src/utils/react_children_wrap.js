
export default function(childrens, cb){
    if (!childrens) {
        return;
    }
    
    return (childrens instanceof Array ? childrens : [childrens]).map(cb);
}