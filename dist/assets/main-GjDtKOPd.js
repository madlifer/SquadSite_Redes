import{d as i}from"./mobile-viewport-D-N9odkz.js";if(!(window.location.href.includes("squad-armor.com")||window.location.href.includes("www.squad-armor.com")||window.location.href.includes("localhost")))throw new Error("This site is STOLEN");const n=document.getElementById("vehicleSelector");document.getElementById("vehicleSelector").style.setProperty("margin-top",(document.getElementById("nav").clientHeight+10).toString()+"px");window.addEventListener("resize",()=>{document.getElementById("vehicleSelector").style.setProperty("margin-top",(document.getElementById("nav").clientHeight+10).toString()+"px")});const o=document.getElementById("searchSort");o.addEventListener("input",()=>{d();for(let e=0;e<n.children.length;e++)if(n.children[e].style.display=="block")for(let t=0;t<n.children[e].children.length;t++)n.children[e].children[t].children[0].innerText.toLowerCase().replace(/[- ]/g,"").includes(o.value.toLowerCase())||n.children[e].children[t].children[0].innerText.toLowerCase().replace(/[- ]/g,"").includes(o.value.toLowerCase().replace(/[- ]/g,""))?n.children[e].style.setProperty("display","block"):n.children[e].style.setProperty("display","none")});const s=document.getElementById("factionType");s.addEventListener("mousedown",e=>{if(e.target.text=="BLUFOR"||e.target.text=="REDFOR"||e.target.text=="Independent")document.getElementById("BLUFOR").style.setProperty("display","none"),document.getElementById("REDFOR").style.setProperty("display","none"),document.getElementById("Independent").style.setProperty("display","none"),document.getElementById(e.target.text).style.setProperty("display","flex");else if(e.target.text!=null){d(),o.value="";for(let l=0;l<n.children.length;l++)for(let c=0;c<n.children[l].children.length;c++){var t=n.children[l].children[c].children[3].innerText.split(": ")[1];t.includes(e.target.text||e.target.text+",")||n.children[l].style.setProperty("display","none")}}document.getElementById("vehicleSelector").style.setProperty("margin-top",document.getElementById("nav").clientHeight.toString()+"px")});const a=document.getElementById("type");a.addEventListener("mousedown",e=>{if(e.target.id!="searchSort"&&(o.value=""),e.target.text=="Factions"?s.style.setProperty("display","flex"):e.target.text!=null&&(s.style.setProperty("display","none"),document.getElementById("BLUFOR").style.setProperty("display","none"),document.getElementById("REDFOR").style.setProperty("display","none"),document.getElementById("Independent").style.setProperty("display","none")),document.getElementById("vehicleSelector").style.setProperty("margin-top",document.getElementById("nav").clientHeight.toString()+"px"),e.target.text=="Aerial"){d();for(let t=0;t<n.children.length;t++)for(let l=0;l<n.children[t].children.length;l++)n.children[t].children[l].children[2].innerText.split(" ")[1]!="Heli"&&n.children[t].style.setProperty("display","none")}else if(e.target.text!="Factions"&&e.target.text!="All"&&e.target.text!=null){d();for(let t=0;t<n.children.length;t++)for(let l=0;l<n.children[t].children.length;l++)n.children[t].children[l].children[2].innerText.split(" ")[1]!=e.target.text&&n.children[t].style.setProperty("display","none")}else e.target.text=="All"&&d()});for(let e in i){var r="";for(let t=0;t<i[e].Opt_Faction.length;t++)r==""||(r=r+", "),r=r+i[e].Opt_Faction[t];y(e,r)}function y(e,t){const l=document.createElement("a");l.href="vicPage#"+e,l.style.setProperty("display","block"),l.innerHTML=`<div class="item">
                    <h3>${i[e].Opt_Name}</h3>
                    <img src="/imgs/${e}.webp" alt="${e}">
                    <p>Type: ${i[e].Opt_Type}</p>
                    <p>Faction: ${t}</p>
                    <input name="compare" type="checkbox" value="${e}"> Compare</input>
                </div>`,document.getElementById("vehicleSelector").appendChild(l)}function d(){for(let e=0;e<n.children.length;e++)n.children[e].style.setProperty("display","block")}document.addEventListener("click",()=>{const e=document.querySelectorAll('input[name="compare"]:checked');var t="";if(e.length==2){for(let l=0;l<e.length;l++)console.log(e[l].attributes.value.nodeValue),t=t+"#"+e[l].attributes.value.nodeValue;window.location.href="vicPage"+t}});
