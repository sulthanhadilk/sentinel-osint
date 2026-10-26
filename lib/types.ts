export type SearchType = "username"|"email"|"phone"|"domain"|"ip"|"url";
export type ResultStatus = "Confirmed by source"|"Not found at source"|"Inconclusive"|"Unavailable"|"Demo result";
export interface Finding { provider:string; title:string; summary:string; status:ResultStatus; sourceUrl?:string; retrievedAt:string; mode:"live"|"local"|"demo"; data?:unknown; error?:string }
export interface Investigation { id:string; name:string; query:string; type:SearchType; notes:string; findings:Finding[]; createdAt:string; updatedAt:string }
