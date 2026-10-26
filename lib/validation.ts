import { z } from "zod";
import { isIP } from "node:net";
import { parsePhoneNumberFromString } from "libphonenumber-js";
export const searchSchema = z.object({ type:z.enum(["username","email","phone","domain","ip","url"]), query:z.string().trim().min(1).max(512) });
export const normalizeUsername = (value:string) => value.trim().replace(/^@+/,"").toLowerCase();
export const normalizeEmail = (value:string) => value.trim().toLowerCase();
export function classifyIp(value:string) {
  const ip=value.trim(); const version=isIP(ip);
  if (!version) return { valid:false, category:"invalid" };
  const private4=version===4 && (/^10./.test(ip)||/^192.168./.test(ip)||/^172.(1[6-9]|2d|3[01])./.test(ip));
  const category=ip==="127.0.0.1"||ip==="::1"?"loopback":private4||ip.startsWith("fc")||ip.startsWith("fd")?"private":ip.startsWith("169.254.")||ip.startsWith("fe80")?"link-local":ip==="0.0.0.0"||ip==="::"?"unspecified":ip.startsWith("224.")||ip.startsWith("ff")?"multicast":"public";
  return { valid:true, version:version===4?"IPv4":"IPv6", category };
}
export function phoneMetadata(value:string) { const parsed=parsePhoneNumberFromString(value); return parsed ? { valid:parsed.isValid(), possible:parsed.isPossible(), e164:parsed.number, country:parsed.country ?? "unknown", callingCode:'+'+parsed.countryCallingCode } : {valid:false,possible:false}; }
export function isSafeHostname(hostname:string) { const h=hostname.toLowerCase(); return h!=="localhost"&&!h.endsWith(".localhost")&&!h.endsWith(".internal")&&!h.startsWith("127.")&&!h.startsWith("10.")&&!h.startsWith("192.168.")&&!h.startsWith("169.254.")&&!h.startsWith("::1")&&!h.startsWith("0."); }
