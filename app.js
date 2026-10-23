(() => {
'use strict';
const $=s=>document.querySelector(s);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const repo=p=>`https://github.com/lpl969/${encodeURIComponent(p.id)}`;
let category='all';
function route(){const name=location.hash.slice(1)||'home';const current=['home','publications','projects','cv'].includes(name)?name:'home';document.querySelectorAll('[data-view]').forEach(el=>el.hidden=el.dataset.view!==current);document.querySelectorAll('[data-page]').forEach(el=>{const active=el.dataset.page===current;el.classList.toggle('active',active);if(active)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});document.title=`连鹏磊 | ${{home:'个人主页',publications:'论文与学术成果',projects:'研究与开源项目',cv:'简历'}[current]}`;window.scrollTo(0,0);}
function render(){const query=$('#search').value.trim().toLowerCase();const list=window.PROJECTS.filter(p=>(category==='all'||p.category===category)&&[p.title,p.id,p.description,...p.tags].join(' ').toLowerCase().includes(query));$('#project-list').innerHTML=list.map(p=>`<article class="project-entry"><div class="project-label">${escape(p.label.split(' / ')[0])}</div><h3><a href="${repo(p)}" target="_blank" rel="noopener noreferrer">${escape(p.title)}</a></h3><p>${escape(p.description)}</p><div class="tags">${p.tags.map(t=>`<span>${escape(t)}</span>`).join('')}</div><details><summary>实现细节与公开代码范围</summary><ul>${p.highlights.map(t=>`<li>${escape(t)}</li>`).join('')}</ul><p class="boundary">${escape(p.boundary)}</p></details><div class="project-links"><a href="${repo(p)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="${repo(p)}/blob/main/${p.evidence}" target="_blank" rel="noopener noreferrer">代码说明 ↗</a></div></article>`).join('');$('#result-count').textContent=`显示 ${list.length} / ${window.PROJECTS.length} 个项目`;$('#empty-state').hidden=!!list.length;}
$('.filters').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;category=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(el=>{el.classList.toggle('active',el===b);el.setAttribute('aria-pressed',String(el===b));});render();});
$('#search').addEventListener('input',render);
function setTheme(theme){document.documentElement.dataset.theme=theme;$('#theme-toggle').setAttribute('aria-label',theme==='dark'?'切换浅色模式':'切换深色模式');$('#theme-toggle').textContent=theme==='dark'?'☾':'☼';}
try{setTheme(localStorage.getItem('portfolio-theme')||'light')}catch{setTheme('light')}
$('#theme-toggle').addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';setTheme(theme);try{localStorage.setItem('portfolio-theme',theme)}catch{}});
$('#print-cv').addEventListener('click',()=>window.print());
window.addEventListener('hashchange',route);route();render();
})();
