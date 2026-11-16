export const STORAGE_KEY='glucocare-v2';
export const initialData=()=>({doses:[{id:'morning',time:'8:00 AM',name:'Basal Insulin',units:18,status:'Due'},{id:'noon',time:'12:00 PM',name:'Rapid-Acting Insulin',units:6,status:'Upcoming'},{id:'evening',time:'6:00 PM',name:'Rapid-Acting Insulin',units:7,status:'Upcoming'},{id:'night',time:'10:00 PM',name:'Basal Insulin',units:18,status:'Upcoming'}],readings:[{id:'r1',value:7.4,date:'2026-11-03T12:30'},{id:'r2',value:6.2,date:'2026-11-03T07:30'},{id:'r3',value:6.8,date:'2026-11-02T12:30'}]});
export function validateGlucose(raw){if(!raw.trim())return 'Enter a glucose value before saving.';if(!/^-?(?:\d+\.?\d*|\.\d+)$/.test(raw.trim())||!Number.isFinite(Number(raw)))return 'Enter a number, for example 6.2.';if(Number(raw)<0)return 'A glucose value cannot be negative. Please enter a valid measurement.';if(Number(raw)===0)return 'Enter a glucose value greater than zero.';return '';}
export function recordDose(data,id,date){return {...data,doses:data.doses.map(d=>d.id===id&&d.status!=='Taken'?{...d,status:'Taken',completed:date}:d)};}
export function validData(data){return data&&Array.isArray(data.doses)&&data.doses.length===4&&data.doses.every(d=>typeof d.id==='string'&&typeof d.name==='string'&&typeof d.time==='string'&&Number.isFinite(d.units)&&['Taken','Due','Upcoming'].includes(d.status))&&Array.isArray(data.readings)&&data.readings.every(r=>typeof r.id==='string'&&Number.isFinite(r.value)&&r.value>0&&Number.isFinite(Date.parse(r.date)));}
export function loadData(storage){try{const data=JSON.parse(storage.getItem(STORAGE_KEY));return validData(data)?data:initialData();}catch{return initialData();}}

export function validateDose(raw,scheduledUnits){
 if(!raw.trim())return 'Enter a dose before confirming.';
 if(!/^-?(?:\d+\.?\d*|\.\d+)$/.test(raw.trim())||!Number.isFinite(Number(raw)))return 'Enter a valid number of units.';
 if(Number(raw)<0)return 'An insulin dose cannot be negative. Enter a value greater than zero.';
 if(Number(raw)===0)return 'An insulin dose must be greater than zero.';
 if(Number(raw)!==scheduledUnits)return `This value does not match the scheduled dose of ${scheduledUnits} units. Check the entry before confirming. Your scheduled dose has not been changed.`;
 return '';
}
