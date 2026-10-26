import { NextResponse } from "next/server";
const providers = [["dns","DNS records and mail policy","live"],["rdap","IP RDAP registration","live"],["crtsh","Certificate Transparency","live"],["github","GitHub public profiles","live"],["phone","Phone metadata","local"],["ip-classification","IP classification","local"],["url-safety","URL safety and headers","local"]];
export async function GET(){return NextResponse.json({retrievedAt:new Date().toISOString(),providers:providers.map(([id,name,mode])=>({id,name,mode,status:"available"}))});}
