/*! For license information please see main.76215d13.js.LICENSE.txt */
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,rX=uU`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,oX=uU`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,aX=Qr("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),iX=Qr(eX,{name:"MuiTouchRipple",slot:"Ripple"})`
  opacity: 0;
  position: absolute;

  &.${tX.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${nX};
    animation-duration: ${550}ms;
    animation-timing-function: ${e=>{let{theme:t}=e;return t.transitions.easing.easeInOut}};
  }

  &.${tX.ripplePulsate} {
    animation-duration: ${e=>{let{theme:t}=e;return t.transitions.duration.shorter}}ms;
  }

  & .${tX.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${tX.childLeaving} {
    opacity: 0;
    animation-name: ${rX};
    animation-duration: ${550}ms;
    animation-timing-function: ${e=>{let{theme:t}=e;return t.transitions.easing.easeInOut}};
  }

  & .${tX.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${oX};
    animation-duration: 2500ms;
    animation-timing-function: ${e=>{let{theme:t}=e;return t.transitions.easing.easeInOut}};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,lX=t.forwardRef((function(e,n){const r=ro({props:e,name:"MuiTouchRipple"}),{center:o=!1,classes:a={},className:l,...c}=r,[s,u]=t.useState([]),f=t.useRef(0),m=t.useRef(null);t.useEffect((()=>{m.current&&(m.current(),m.current=null)}),[s]);const p=t.useRef(!1),d=LB(),h=t.useRef(null),v=t.useRef(null),y=t.useCallback((e=>{const{pulsate:t,rippleX:n,rippleY:r,rippleSize:o,cb:l}=e;u((e=>[...e,(0,G.jsx)(iX,{classes:{ripple:i(a.ripple,tX.ripple),rippleVisible:i(a.rippleVisible,tX.rippleVisible),ripplePulsate:i(a.ripplePulsate,tX.ripplePulsate),child:i(a.child,tX.child),childLeaving:i(a.childLeaving,tX.childLeaving),childPulsate:i(a.childPulsate,tX.childPulsate)},timeout:550,pulsate:t,rippleX:n,rippleY:r,rippleSize:o},f.current)])),f.current+=1,m.current=l}),[a]),P=t.useCallback((function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:()=>{};const{pulsate:r=!1,center:a=o||t.pulsate,fakeElement:i=!1}=t;if("mousedown"===e?.type&&p.current)return void(p.current=!1);"touchstart"===e?.type&&(p.current=!0);const l=i?null:v.current,c=l?l.getBoundingClientRect():{width:0,height:0,left:0,top:0};let s,u,f;if(a||void 0===e||0===e.clientX&&0===e.clientY||!e.clientX&&!e.touches)s=Math.round(c.width/2),u=Math.round(c.height/2);else{const{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;s=Math.round(t-c.left),u=Math.round(n-c.top)}if(a)f=Math.sqrt((2*c.width**2+c.height**2)/3),f%2===0&&(f+=1);else{const e=2*Math.max(Math.abs((l?l.clientWidth:0)-s),s)+2,t=2*Math.max(Math.abs((l?l.clientHeight:0)-u),u)+2;f=Math.sqrt(e**2+t**2)}e?.touches?null===h.current&&(h.current=()=>{y({pulsate:r,rippleX:s,rippleY:u,rippleSize:f,cb:n})},d.start(80,(()=>{h.current&&(h.current(),h.current=null)}))):y({pulsate:r,rippleX:s,rippleY:u,rippleSize:f,cb:n})}),[o,y,d]),g=t.useCallback((()=>{P({},{pulsate:!0})}),[P]),D=t.useCallback(((e,t)=>{if(d.clear(),"touchend"===e?.type&&h.current)return h.current(),h.current=null,void d.start(0,(()=>{D(e,t)}));h.current=null,u((e=>e.length>0?e.slice(1):e)),m.current=t}),[d]);return t.useImperativeHandle(n,(()=>({pulsate:g,start:P,stop:D})),[g,P,D]),(0,G.jsx)(aX,{className:i(tX.root,a.root,l),ref:v,...c,children:(0,G.jsx)(mb,{component:null,exit:!0,children:s})})}));function cX(e){return uo("MuiButtonBase",e)}const sX=fo("MuiButtonBase",["root","disabled","focusVisible"]),uX=Qr("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${sX.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),fX=t.forwardRef((function(e,n){const r=ro({props:e,name:"MuiButtonBase"}),{action:o,centerRipple:a=!1,children:c,className:s,component:u="button",disabled:f=!1,disableRipple:m=!1,disableTouchRipple:p=!1,focusRipple:d=!1,focusVisibleClassName:h,LinkComponent:v="a",onBlur:y,onClick:P,onContextMenu:g,onDragLeave:D,onFocus:b,onFocusVisible:N,onKeyDown:w,onKeyUp:R,onMouseDown:S,onMouseLeave:k,onMouseUp:T,onTouchEnd:I,onTouchMove:x,onTouchStart:B,tabIndex:F=0,TouchRippleProps:U,touchRippleRef:X,type:O,..._}=r,A=t.useRef(null),j=JU.use(),C=kB(j.ref,X),[M,L]=t.useState(!1);f&&M&&L(!1),t.useImperativeHandle(o,(()=>({focusVisible:()=>{L(!0),A.current.focus()}})),[]);const z=j.shouldMount&&!m&&!f;function $(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:p;return ZU((r=>{t&&t(r);return n||j[e](r),!0}))}t.useEffect((()=>{M&&d&&!m&&j.pulsate()}),[m,d,M,j]);const W=$("start",S),V=$("stop",g),H=$("stop",D),q=$("stop",T),K=$("stop",(e=>{M&&e.preventDefault(),k&&k(e)})),Y=$("start",B),Q=$("stop",I),Z=$("stop",x),J=$("stop",(e=>{E(e.target)||L(!1),y&&y(e)}),!1),ee=ZU((e=>{A.current||(A.current=e.currentTarget),E(e.target)&&(L(!0),N&&N(e)),b&&b(e)})),te=()=>{const e=A.current;return u&&"button"!==u&&!("A"===e.tagName&&e.href)},ne=ZU((e=>{d&&!e.repeat&&M&&" "===e.key&&j.stop(e,(()=>{j.start(e)})),e.target===e.currentTarget&&te()&&" "===e.key&&e.preventDefault(),w&&w(e),e.target===e.currentTarget&&te()&&"Enter"===e.key&&!f&&(e.preventDefault(),P&&P(e))})),re=ZU((e=>{d&&" "===e.key&&M&&!e.defaultPrevented&&j.stop(e,(()=>{j.pulsate(e)})),R&&R(e),P&&e.target===e.currentTarget&&te()&&" "===e.key&&!e.defaultPrevented&&P(e)}));let oe=u;"button"===oe&&(_.href||_.to)&&(oe=v);const ae={};"button"===oe?(ae.type=void 0===O?"button":O,ae.disabled=f):(_.href||_.to||(ae.role="button"),f&&(ae["aria-disabled"]=f));const ie=kB(n,A),le={...r,centerRipple:a,component:u,disabled:f,disableRipple:m,disableTouchRipple:p,focusRipple:d,tabIndex:F,focusVisible:M},ce=(e=>{const{disabled:t,focusVisible:n,focusVisibleClassName:r,classes:o}=e,a=l({root:["root",t&&"disabled",n&&"focusVisible"]},cX,o);return n&&r&&(a.root+=` ${r}`),a})(le);return(0,G.jsxs)(uX,{as:oe,className:i(ce.root,s),ownerState:le,onBlur:J,onClick:P,onContextMenu:V,onFocus:ee,onKeyDown:ne,onKeyUp:re,onMouseDown:W,onMouseLeave:K,onMouseUp:q,onDragLeave:H,onTouchEnd:Q,onTouchMove:Z,onTouchStart:Y,ref:ie,tabIndex:f?-1:F,type:O,...ae,..._,children:[c,z?(0,G.jsx)(lX,{ref:C,center:a,...U}):null]})}));const mX=fo("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);const pX=fo("MuiListItemIcon",["root","alignItemsFlexStart"]);const dX=fo("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);function hX(e){return uo("MuiMenuItem",e)}const vX=fo("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),yX=Qr(fX,{shouldForwardProp:e=>Yr(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.dense&&t.dense,n.divider&&t.divider,!n.disableGutters&&t.gutters]}})(Jr((e=>{let{theme:t}=e;return{...t.typography.body1,display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap","&:hover":{textDecoration:"none",backgroundColor:(t.vars||t).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${vX.selected}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:v(t.palette.primary.main,t.palette.action.selectedOpacity),[`&.${vX.focusVisible}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.focusOpacity}))`:v(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},[`&.${vX.selected}:hover`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.hoverOpacity}))`:v(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:v(t.palette.primary.main,t.palette.action.selectedOpacity)}},[`&.${vX.focusVisible}`]:{backgroundColor:(t.vars||t).palette.action.focus},[`&.${vX.disabled}`]:{opacity:(t.vars||t).palette.action.disabledOpacity},[`& + .${mX.root}`]:{marginTop:t.spacing(1),marginBottom:t.spacing(1)},[`& + .${mX.inset}`]:{marginLeft:52},[`& .${dX.root}`]:{marginTop:0,marginBottom:0},[`& .${dX.inset}`]:{paddingLeft:36},[`& .${pX.root}`]:{minWidth:36},variants:[{props:e=>{let{ownerState:t}=e;return!t.disableGutters},style:{paddingLeft:16,paddingRight:16}},{props:e=>{let{ownerState:t}=e;return t.divider},style:{borderBottom:`1px solid ${(t.vars||t).palette.divider}`,backgroundClip:"padding-box"}},{props:e=>{let{ownerState:t}=e;return!t.dense},style:{[t.breakpoints.up("sm")]:{minHeight:"auto"}}},{props:e=>{let{ownerState:t}=e;return t.dense},style:{minHeight:32,paddingTop:4,paddingBottom:4,...t.typography.body2,[`& .${pX.root} svg`]:{fontSize:"1.25rem"}}}]}}))),PX=t.forwardRef((function(e,n){const r=ro({props:e,name:"MuiMenuItem"}),{autoFocus:o=!1,component:a="li",dense:c=!1,divider:s=!1,disableGutters:u=!1,focusVisibleClassName:f,role:m="menuitem",tabIndex:p,className:d,...h}=r,v=t.useContext(bB),y=t.useMemo((()=>({dense:c||v.dense||!1,disableGutters:u})),[v.dense,c,u]),P=t.useRef(null);TB((()=>{o&&P.current&&P.current.focus()}),[o]);const g={...r,dense:y.dense,divider:s,disableGutters:u},D=(e=>{const{disabled:t,dense:n,divider:r,disableGutters:o,selected:a,classes:i}=e,c=l({root:["root",n&&"dense",t&&"disabled",!o&&"gutters",r&&"divider",a&&"selected"]},hX,i);return{...i,...c}})(r),b=kB(P,n);let N;return r.disabled||(N=void 0!==p?p:-1),(0,G.jsx)(bB.Provider,{value:y,children:(0,G.jsx)(yX,{ref:b,role:m,tabIndex:N,component:a,focusVisibleClassName:i(D.focusVisible,f),className:i(D.root,d),...h,ownerState:g,classes:D})})})),gX=e=>{let{indicator:t,handleIndicatorChange:n}=e;return(0,G.jsxs)(aB,{fullWidth:!0,children:[(0,G.jsx)(hB,{id:"select-label",children:"Macro-Economic Indicator"}),(0,G.jsxs)(QU,{labelId:"select-label",id:"select",value:t,label:"Indicator",onChange:n,children:[(0,G.jsx)(PX,{value:"GDP growth (annual %)",children:"GDP growth (annual %)"}),(0,G.jsx)(PX,{value:"FX Reserves",children:"FX Reserves"}),(0,G.jsx)(PX,{value:"Government Debt-to-GDP",children:"Government Debt-to-GDP"}),(0,G.jsx)(PX,{value:"Balance of Trade",children:"Balance of Trade"}),(0,G.jsx)(PX,{value:"Inflation",children:"Inflation"}),(0,G.jsx)(PX,{value:"Unemployment Rate",children:"Unemployment Rate"})]})]})},DX=()=>{const[e]=(0,t.useState)([2008,2023]),[n,r]=(0,t.useState)([2008,2023]),[o,a]=(0,t.useState)(""),[i,l]=(0,t.useState)(null),[c]=(0,t.useState)("large"),s=(0,t.useCallback)((e=>{r(e)}),[]),u=(0,t.useCallback)((e=>{a(e.target.value)}),[]);return(0,t.useEffect)((()=>{}),[o,n,i]),(0,G.jsx)("div",{className:"App",style:{paddingTop:"50px"},children:(0,G.jsxs)(Yh,{maxWidth:"lg",children:[(0,G.jsxs)(iv,{container:!0,spacing:4,children:[(0,G.jsx)(iv,{item:!0,xs:10,children:(0,G.jsx)(gX,{indicator:o,handleIndicatorChange:u})}),(0,G.jsx)(iv,{item:!0,xs:2,children:(0,G.jsx)(Ro,{startYear:e[0],endYear:e[1],onChange:s})})]}),(0,G.jsx)(Ch,{yearRange:n,indicator:o,onClick:e=>l(e),style:{width:"large"===c?"100%":"50%",height:"auto"}}),i&&(0,G.jsx)(Zx,{country:i,yearRange:n,indicator1:"Stock Price",indicator2:o})]})})},bX=e=>{e&&e instanceof Function&&n.e(453).then(n.bind(n,6453)).then((t=>{let{getCLS:n,getFID:r,getFCP:o,getLCP:a,getTTFB:i}=t;n(e),r(e),o(e),a(e),i(e)}))};o.createRoot(document.getElementById("root")).render((0,G.jsx)(t.StrictMode,{children:(0,G.jsx)(DX,{})})),bX()})()})();
//# sourceMappingURL=main.76215d13.js.map