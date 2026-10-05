export const SAFAR={projectId:'safaronline',apiKey:'AIzaSyCBVjmIfqL0fHTu76PfrMHVgAVwB_uZb30',database:'(default)',bucket:'safaronline.firebasestorage.app'};
export const API=SAFAR.apiKey;
export const BASE=`https://firestore.googleapis.com/v1/projects/${SAFAR.projectId}/databases/${SAFAR.database}/documents`;
const AUTH='https://identitytoolkit.googleapis.com/v1/accounts:signUp';
let token=localStorage.getItem('safar_auth_token')||'';
export async function authInit(){if(token)return token;const r=await fetch(`${AUTH}?key=${API}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({returnSecureToken:true})});const j=await r.json();if(!r.ok)throw Error(j?.error?.message||'Firebase Authentication فعال نیست.');token=j.idToken;localStorage.setItem('safar_auth_token',token);localStorage.setItem('safar_auth_uid',j.localId||'');return token}
export function uid(){return localStorage.getItem('safar_auth_uid')||''}
export async function apiFetch(url,opts={}){const t=await authInit();const headers=new Headers(opts.headers||{});headers.set('Authorization',`Bearer ${t}`);if(opts.body&&!headers.has('Content-Type'))headers.set('Content-Type','application/json');let r=await fetch(url,{...opts,headers});if(r.status===401){localStorage.removeItem('safar_auth_token');token='';const t2=await authInit();headers.set('Authorization',`Bearer ${t2}`);r=await fetch(url,{...opts,headers})}return r}
export function field(v){return v?.stringValue!==undefined?v.stringValue:''}
export function numberField(v){return v?.doubleValue!==undefined?Number(v.doubleValue):(v?.integerValue!==undefined?Number(v.integerValue):0)}
export function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
export function textField(v){return {stringValue:String(v??'')}}
export function doubleField(v){return {doubleValue:Number(v)||0}}
export function stamp(){return {timestampValue:new Date().toISOString()}}
