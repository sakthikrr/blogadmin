import{$ as x,A as l,B as y,C as $,D as B,E as O,F as u,G as z,I as Q,J as W,K as C,L as Z,M as J,Q as K,R as X,S as Y,T as tt,a as j,aa as L,b as U,ba as P,ca as E,d as R,da as et,e as _,ea as F,f as q,fa as T,ga as M,h as v,ha as I,i as w,ia as it,j as V,ja as ot,k as G,ka as st,la as rt,m as p,ma as nt,n as d,na as lt,pa as pt,qa as D,r as S,s as m,sa as at,t as f,ta as mt,u as r,ua as ct,v as s,w as a,wa as dt,x as H,xa as ut,y as g,z as A}from"./chunk-HP76EDOD.js";import"./chunk-MON7YFGF.js";var ht={production:!1,apiUrl:"https://www.api.saktech.online/wp-json/wp/v2/"};var k=(()=>{class o{constructor(t){this.httpcli=t,this.baseUrl=ht.apiUrl,this.username="od5bp",this.appPassword="wxNQ vGTr HET4 W61D 2z0L zV0Z",this.authHeader="Basic "+btoa(this.username+":"+this.appPassword)}getPosts(){return this.httpcli.get(`${this.baseUrl}posts`)}getSinglePost(t){return this.httpcli.get(`${this.baseUrl}posts/${t}`)}postQuickUpdate(t,e){let i=`${this.baseUrl}posts/${t}`,n=new C({"Content-Type":"application/json",Authorization:this.authHeader});return this.httpcli.put(i,e,{headers:n})}postUpdate(t,e){let i=`${this.baseUrl}posts/${t}`,n=new C({"Content-Type":"application/json",Authorization:this.authHeader});return this.httpcli.put(i,e,{headers:n})}postCategoryList(){let t=`${this.baseUrl}categories`;return this.httpcli.get(t).pipe(j(e=>e.map(i=>({id:i.id,name:i.name,slug:i.slug,description:i.description,count:i.count}))))}postStatusList(){let t=`${this.baseUrl}statuses`,e=new C({"Content-Type":"application/json",Authorization:this.authHeader});return this.httpcli.get(t,{headers:e}).pipe(U(i=>console.log("Fetched statuses:",Object.keys(i))),j(i=>Object.keys(i).map(n=>({name:i[n].name,public:i[n].public,protected:i[n].protected,private:i[n].private,queryable:i[n].queryable,slug:i[n].slug}))))}static{this.\u0275fac=function(e){return new(e||o)(q(Z))}}static{this.\u0275prov=R({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();var Ct=()=>({"min-width":"50rem"}),xt=()=>[10,25,50],Pt=()=>({width:"25rem"}),Et=()=>({"background-color":"#9c27b0",border:"none"}),Ft=o=>["edit-post",o];function Tt(o,b){o&1&&(r(0,"tr",15)(1,"th",16),l(2,"ID"),s(),r(3,"th",17),l(4,"Title"),s(),r(5,"th",18),l(6,"Slug"),s(),r(7,"th",19),l(8,"Actions"),s()())}function Mt(o,b){if(o&1){let t=H();r(0,"tr",15)(1,"td",20),l(2),s(),r(3,"td",21),l(4),s(),r(5,"td",22),l(6),s(),r(7,"td",20)(8,"div",23)(9,"button",24),g("click",function(){let i=V(t).$implicit,n=A();return G(n.showDialog(i.id))}),s(),a(10,"button",25),s()()()}if(o&2){let t=b.$implicit;p(2),y(t.id),p(2),y(t.title),p(2),y(t.slug),p(4),m("routerLink",z(4,Ft,t.id))}}function It(o,b){o&1&&(r(0,"div",29),a(1,"i",30),r(2,"span"),l(3,"Post updated successfully!"),s()())}function Nt(o,b){o&1&&(r(0,"div",26)(1,"p-messages",27),S(2,It,4,0,"ng-template",28),s()())}var gt=(()=>{class o{constructor(t){this.postser=t,this.PostListdata=[],this.PostsList=[],this.showSuccessMessage=!1,this.visible=!1,this.postquickedit=new et({post_title:new F(""),post_slug:new F(""),post_id:new F("")})}ngOnInit(){this.postser.getPosts().subscribe(t=>{this.PostsList=t,this.createIdSlugArray()})}createIdSlugArray(){this.PostListdata=this.PostsList.map(t=>({id:t.id,slug:t.slug,title:t.title.rendered}))}showDialog(t){this.showSuccessMessage=!1,this.postser.getSinglePost(t).subscribe({next:e=>{this.postquickedit.patchValue({post_title:e?.title?.rendered||"",post_slug:e?.slug||"",post_id:e.id}),this.visible=!0},error:e=>{console.error("Failed to fetch the post:",e)}})}onSubmit(){let t={id:this.postquickedit.value.post_id,title:this.postquickedit.value.post_title,slug:this.postquickedit.value.post_slug};this.postser.postQuickUpdate(this.postquickedit.value.post_id,t).subscribe({next:e=>{console.log(e),this.showSuccessMessage=!0},error:e=>{console.error("Failed to update the post:",e)}})}static{this.\u0275fac=function(e){return new(e||o)(d(k))}}static{this.\u0275cmp=v({type:o,selectors:[["app-postlist"]],decls:18,vars:19,consts:[[1,"card","surface-0","shadow-1","border-round","m-2"],["styleClass","p-datatable-sm p-datatable-gridlines p-datatable-striped","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries","responsiveLayout","scroll",3,"value","tableStyle","paginator","rows","showCurrentPageReport","rowsPerPageOptions"],["pTemplate","header"],["pTemplate","body"],["header","Post Quick Edit",3,"visibleChange","modal","visible","closable"],["class","mb-3",4,"ngIf"],[3,"ngSubmit","formGroup"],[1,"field"],["for","ptitle",1,"block","mb-2"],["id","ptitle","type","text","pInputText","","formControlName","post_title",1,"w-full"],["for","pslug",1,"block","mb-2"],["id","pslug","type","text","pInputText","","formControlName","post_slug",1,"w-full"],["id","post_id","type","hidden","formControlName","post_id"],[1,"mt-3","text-right"],["pButton","","type","submit","label","Submit"],[1,"flex","w-full"],[1,"flex-shrink-0","w-2","text-left"],[1,"flex-grow-1","w-5","text-left"],[1,"flex-grow-1","w-4","text-left"],[1,"flex-shrink-0","w-2","text-center"],[1,"flex-shrink-0","w-2"],[1,"flex-grow-1","w-5"],[1,"flex-grow-1","w-4"],[1,"flex","gap-2","justify-content-center"],["pButton","","pRipple","","type","button","icon","pi pi-file-edit","pTooltip","Quick Edit","tooltipPosition","top",1,"p-button-rounded","p-button-text",3,"click"],["pButton","","pRipple","","type","button","icon","pi pi-pencil","pTooltip","Full Edit","tooltipPosition","top",1,"p-button-rounded","p-button-text",3,"routerLink"],[1,"mb-3"],["severity","success"],["pTemplate","content"],[1,"flex","align-items-center"],[1,"pi","pi-check-circle","mr-2"]],template:function(e,i){e&1&&(r(0,"div",0)(1,"p-table",1),S(2,Tt,9,0,"ng-template",2)(3,Mt,11,6,"ng-template",3),s()(),r(4,"p-dialog",4),O("visibleChange",function(c){return B(i.visible,c)||(i.visible=c),c}),S(5,Nt,3,0,"div",5),r(6,"form",6),g("ngSubmit",function(){return i.onSubmit()}),r(7,"div",7)(8,"label",8),l(9,"Post Title:"),s(),a(10,"input",9),s(),r(11,"div",7)(12,"label",10),l(13,"Post Title:"),s(),a(14,"input",11),s(),a(15,"input",12),r(16,"div",13),a(17,"button",14),s()()()),e&2&&(p(),m("value",i.PostListdata)("tableStyle",u(15,Ct))("paginator",!0)("rows",10)("showCurrentPageReport",!0)("rowsPerPageOptions",u(16,xt)),p(3),f(u(17,Pt)),m("modal",!0),$("visible",i.visible),m("closable",!0),p(),m("ngIf",i.showSuccessMessage),p(),m("formGroup",i.postquickedit),p(11),f(u(18,Et)))},dependencies:[Q,pt,Y,X,nt,st,at,dt,T,x,P,E,M,I]})}}return o})();var kt=()=>({height:"320px",width:"100%"}),bt=(()=>{class o{constructor(t,e,i,n){this.fb=t,this.route=e,this.postservice=i,this.messageService=n,this.category_list=[],this.post_status=[],this.categories=[],this.postForm=this.fb.group({post_title:["",L.required],post_content:["",L.required],post_id:[""],select_status:[""],selectedCategory:[""]}),this.postservice.postStatusList().subscribe(c=>{this.post_status=c.map(h=>({name:h.name,code:h.slug}))}),this.postservice.postCategoryList().subscribe(c=>{this.categories=c,this.category_list=this.categories.map(h=>({name:h.name,code:h.id})),this.loadPosts()})}ngOnInit(){}loadPosts(){this.postId=Number(this.route.snapshot.paramMap.get("id"))||0,console.log("Hai",this.post_status[2]),this.postservice.getSinglePost(this.postId).subscribe({next:t=>{let e=this.category_list.filter(n=>t.categories?.includes(n.code)),i=this.post_status.find(n=>n.code===t.status);this.postForm.patchValue({post_title:t?.title?.rendered||"",post_content:t?.content?.rendered||"",post_id:t.id,select_status:i,selectedCategory:e})}})}onSubmit(){if(this.postForm.valid){let t={title:this.postForm.value.post_title,id:this.postForm.value.post_id,content:this.postForm.value.post_content,status:this.postForm.value.select_status.code,categories:this.postForm.value.selectedCategory.map(e=>e.code)};this.postservice.postUpdate(this.postForm.value.post_id,t).subscribe(e=>{console.log(e),this.showSuccess()})}}showSuccess(){this.messageService.add({severity:"success",summary:"Post Updated",detail:"Post Updated Successfully"})}static{this.\u0275fac=function(e){return new(e||o)(d(it),d(lt),d(k),d(K))}}static{this.\u0275cmp=v({type:o,selectors:[["app-postedit"]],decls:22,vars:7,consts:[[1,"card","m-2"],[3,"ngSubmit","formGroup"],[1,"field","grid"],["for","post_title",1,"col-fixed",2,"width","100px"],["id","post_title","formControlName","post_title","type","text",1,"text-base","text-color","surface-overlay","p-2","border-1","border-solid","surface-border","border-round","appearance-none","outline-none","focus:border-primary"],["for","post_content",1,"col-fixed",2,"width","100px"],["formControlName","post_content"],["formControlName","selectedCategory","optionLabel","name","styleClass","w-full",3,"options","multiple"],["for","select_status",1,"col-fixed",2,"width","100px"],["formControlName","select_status","optionLabel","name","placeholder","Select Status","styleClass","w-full",3,"options"],["type","hidden","formControlName","post_id"],["type","submit","label","Submit"]],template:function(e,i){e&1&&(r(0,"div",0)(1,"h2"),l(2,"Post Edit"),s(),r(3,"form",1),g("ngSubmit",function(){return i.onSubmit()}),r(4,"div",2)(5,"label",3),l(6,"Post Title:"),s(),a(7,"input",4),s(),r(8,"div",2)(9,"label",5),l(10,"Post Content:"),s(),a(11,"p-editor",6),s(),r(12,"div",2)(13,"label",5),l(14,"Post Categories:"),s(),a(15,"p-listbox",7),s(),r(16,"div",2)(17,"label",8),l(18,"Select status:"),s(),a(19,"p-dropdown",9),s(),a(20,"input",10)(21,"p-button",11),s()()),e&2&&(p(3),m("formGroup",i.postForm),p(8),f(u(6,kt)),p(4),m("options",i.category_list)("multiple",!0),p(4),m("options",i.post_status))},dependencies:[tt,mt,ct,rt,T,x,P,E,M,I]})}}return o})();var jt=[{path:"",component:gt},{path:"edit-post/:id",component:bt}],_t=(()=>{class o{static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275mod=w({type:o})}static{this.\u0275inj=_({imports:[D.forChild(jt),D]})}}return o})();var me=(()=>{class o{static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275mod=w({type:o})}static{this.\u0275inj=_({imports:[W,_t,ut,J,ot]})}}return o})();export{me as PostsModule};
