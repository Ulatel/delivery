export default function errorParser(obj){
    let ret = [];
    
    if (obj instanceof Array || obj instanceof Object){
        for (let el of Object.entries(obj)){
            if (el[1] instanceof Array || el[1] instanceof Object){
                ret.push(...errorParser(el[1]));
            }
            
            if (typeof el[1] === 'string' && (/(error|message)/.test(el[0].toLocaleLowerCase()) || el[0] == '0' || +el[0])){
                ret.push(el[1]);
            }
        }
    }
    
    if (obj instanceof String){
        ret.push(obj);
    }
    
    return ret;
}