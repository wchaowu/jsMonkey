/**
 * Created by wuchaowu on 14-4-12.
 */
Array.prototype.isRepeat = function (){
    var nary=this.sort();
    for(var i=0;i<this.length;i++){
        if (nary[i]==nary[i+1]){
            return true;
        }
    }
    return false;
};
