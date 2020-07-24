import { LightningElement,api,wire,track } from 'lwc';
import retriveObjectDetails from '@salesforce/apex/AssignmentFetchAccountRecords.retriveObjectDetails';

export default class ObjectTable extends LightningElement {
    @api objectName;
    @api changeComp;
    @api fieldName;
    @api c=0;
    @api count=0;
    @api main='';
    handleChange(event){
        if(this.c<1){
        this.objectName=event.target.value;
        console.log(this.objectName);
        this.changeComp=false;
        }
        else{
            alert("cannot change");
        }
        
    }
    handleFieldChange(event){
        
       this.fieldName=event.target.value;
       console.log(this.fieldName);
    }
    handleClick(){
          
          this.c=this.c+1;
                this.main=this.fieldName;
                console.log(this.main);
            this.changeComp=true;
            
        }
        
}