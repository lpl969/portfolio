(() => {
  'use strict';
  const projects = window.PROJECTS;
  const $ = (selector) => document.querySelector(selector);
  const svgNS = 'http://www.w3.org/2000/svg';
  const escape = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const repoUrl = (id) => `https://github.com/lpl969/${encodeURIComponent(id)}`;
  const sourceUrl = (project, path = project.evidence) => `${repoUrl(project.id)}/blob/main/${path.split('/').map(encodeURIComponent).join('/')}`;
  let activeFilter = 'all';
  let previousFocus;

  // Static, deterministic concept illustrations; no user data or experimental results.
  function art(type) {
    let shapes = '';
    const line = (x1,y1,x2,y2,color='#7d98dd',width=1) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}"/>`;
    const dot = (x,y,r=4,color='#5476cd') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
    const box = (x,y,w,h,label) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#fafcff" stroke="#c1cee6"/><text x="${x+w/2}" y="${y+h/2+3}" text-anchor="middle" font-size="8" fill="#6379a6" font-family="monospace">${label}</text>`;
    if (type === 'fusion') {
      for(let i=0;i<25;i++) shapes += line(35+i*4,100-Math.sin(i*.8)*18,35+i*4,100+Math.sin(i*.8)*18,'#6384de',2);
      shapes += box(225,66,72,68,'VISION');
      for(let i=0;i<4;i++) shapes += `<rect x="${235+i*13}" y="80" width="8" height="8" fill="#a6b8e8"/><rect x="${235+i*13}" y="96" width="8" height="8" fill="#d1dcf4"/>`;
      shapes += `<path d="M135 100 Q180 35 225 100 M135 100 Q180 165 225 100" fill="none" stroke="#5779cf" stroke-width="1.2"/>`+dot(180,100,20,'#2951ed')+`<text x="180" y="105" text-anchor="middle" fill="white" font-size="17">⊕</text>`;
    } else if (type === 'acoustic') {
      for(let i=0;i<7;i++) shapes += `<ellipse cx="180" cy="102" rx="${26+i*11}" ry="${18+i*8}" fill="none" stroke="#6f8bc5" stroke-opacity="${.8-i*.08}" transform="rotate(-25 180 102)"/>`;
      shapes += line(75,145,285,60,'#c1cce2')+line(110,40,250,162,'#c1cce2')+dot(180,102,6,'#2951ed')+dot(110,130)+dot(248,73)+dot(221,140,3);
    } else if (type === 'agent') {
      shapes += line(85,105,162,105)+line(203,105,275,62)+line(203,105,275,145)+line(275,62,275,145,'#b5c3dd');
      shapes += box(42,87,74,36,'QUERY')+box(148,82,65,45,'AGENT')+box(244,45,65,33,'RETRIEVE')+box(244,128,65,33,'GENERATE');
      shapes += dot(130,105,3)+dot(232,88,3)+dot(232,121,3);
    } else if (type === 'experts') {
      for(let i=0;i<4;i++){shapes += line(105,102,180,51+i*34,'#aebedc')+line(230,51+i*34,290,102,'#aebedc')+box(170,38+i*34,60,26,`EXPERT ${i+1}`);}
      shapes += dot(89,102,20,'#2951ed')+`<text x="89" y="105" text-anchor="middle" fill="white" font-size="7" font-family="monospace">ROUTE</text>`+dot(292,102,8);
    } else if(type === 'sequence') {
      shapes += `<path d="M35 140 Q75 10 115 110 T195 100 T275 93 T330 110" fill="none" stroke="#7694d0" stroke-width="1.5"/>`;
      for(let i=0;i<5;i++){shapes+=box(43+i*57,88,35,28,`S${i}`);if(i<4)shapes+=line(78+i*57,102,100+i*57,102,'#2951ed',1.5);}
      shapes+=`<path d="M60 85 V59 H290 V85" fill="none" stroke="#bdcbe4" stroke-dasharray="3 4"/>`;
    } else if(type === 'eeg') {
      for(let j=0;j<4;j++){let d='';for(let x=30;x<330;x+=2){const y=62+j*28+Math.sin(x*.07+j)*3+Math.sin(x*.25)*Math.exp(-Math.pow((x-170-j*9)/30,2))*15;d+=`${x===30?'M':'L'}${x},${y}`;}shapes+=`<path d="${d}" fill="none" stroke="${['#8199cc','#476ed0','#6c86bc','#9badd0'][j]}" stroke-width="1.3"/>`;}
      shapes += `<rect x="153" y="45" width="55" height="120" rx="3" fill="#2951ed" opacity=".05"/>`;
    } else {
      shapes += box(35,71,78,64,'VISION')+box(141,71,78,64,'STM32')+box(251,57,58,91,'APP');
      for(let i=0;i<5;i++)shapes+=line(151+i*14,64,151+i*14,71)+line(151+i*14,135,151+i*14,142);
      shapes += line(113,103,141,103)+line(219,103,251,103)+`<path d="M58 82v-7h10m27 7v-7H85M58 123v7h10m27-7v7H85" fill="none" stroke="#7690cc"/>`+dot(280,132,3);
    }
    return `<svg viewBox="0 0 360 200" aria-hidden="true"><defs><pattern id="grid-${type}" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".65" fill="#c8d2e5"/></pattern></defs><rect width="360" height="200" fill="url(#grid-${type})"/>${shapes}</svg>`;
  }
  function drawSphere() {
    const group = $('#sphere-lines');
    const project = (x,y,z) => {
      const ay=.6, ax=-.3;
      const X=x*Math.cos(ay)+z*Math.sin(ay), Z=-x*Math.sin(ay)+z*Math.cos(ay);
      return [280+X,211+y*Math.cos(ax)-Z*Math.sin(ax),y*Math.sin(ax)+Z*Math.cos(ax)];
    };
    const path = (points, opacity, width=0.7) => {
      const p=document.createElementNS(svgNS,'path');
      p.setAttribute('d', points.map((v,i)=>`${i?'L':'M'}${v[0].toFixed(1)},${v[1].toFixed(1)}`).join(' '));
      p.setAttribute('fill','none');p.setAttribute('stroke','#3159bd');p.setAttribute('stroke-opacity',opacity);p.setAttribute('stroke-width',width);group.append(p);
    };
    for(let lat=-80;lat<=80;lat+=10){const r=148*Math.cos(lat*Math.PI/180),y=148*Math.sin(lat*Math.PI/180);let pts=[];for(let a=0;a<=360;a+=4)pts.push(project(r*Math.cos(a*Math.PI/180),y,r*Math.sin(a*Math.PI/180)));path(pts,.38);}
    for(let lon=0;lon<180;lon+=10){let pts=[];for(let a=0;a<=360;a+=4){const t=a*Math.PI/180,l=lon*Math.PI/180;pts.push(project(148*Math.cos(t)*Math.cos(l),148*Math.sin(t),148*Math.cos(t)*Math.sin(l)));}path(pts,.26);}
    let orbit=[];for(let a=0;a<=360;a+=3){let t=a*Math.PI/180;orbit.push([280+200*Math.cos(t),211+68*Math.sin(t)-38*Math.cos(t)]);}path(orbit,.38,1);
    [[280,63],[405,157],[160,272],[316,350]].forEach(([x,y],i)=>{const c=document.createElementNS(svgNS,'circle');c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('r',i===1?'5':'3');c.setAttribute('fill','#2951ed');group.append(c);});
  }
  function render() {
    const query=$('#search').value.trim().toLocaleLowerCase();
    const filtered=projects.filter(p=>(activeFilter==='all'||p.category===activeFilter)&&[p.id,p.title,p.description,...p.tags].join(' ').toLocaleLowerCase().includes(query));
    $('#project-grid').innerHTML=filtered.map(p=>`<article class="project-card"><div class="project-art"><span class="art-kicker">${p.kicker}</span><span class="art-index">${String(projects.indexOf(p)+1).padStart(2,'0')} / 07</span>${art(p.art)}<span class="art-caption">${p.caption}</span></div><div class="project-body"><div class="project-category">${p.label}</div><h3>${escape(p.title)}</h3><p class="project-description">${escape(p.description)}</p><div class="tags">${p.tags.map(t=>`<span>${escape(t)}</span>`).join('')}</div><div class="card-footer"><button class="detail-button" data-project="${p.id}" aria-label="查看 ${escape(p.title)} 项目详情">项目解读 <span>↗</span></button><a class="source-link" href="${repoUrl(p.id)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(p.title)} GitHub 源码">GitHub ↗</a></div></div></article>`).join('');
    $('#result-count').textContent=activeFilter==='all'&&!query?'展示全部 7 个项目':`找到 ${filtered.length} 个项目 / 共 7 个`;
    $('#empty-state').hidden=filtered.length>0;
  }
  function openProject(id) {
    const p=projects.find(p=>p.id===id); if(!p)return;
    previousFocus=document.activeElement;
    $('#dialog-content').innerHTML=`<div class="dialog-kicker">${p.label}</div><h2 id="dialog-title" class="dialog-title">${escape(p.title)}</h2><p class="dialog-summary">${escape(p.description)}</p><div class="tags">${p.tags.map(t=>`<span>${escape(t)}</span>`).join('')}</div><section class="dialog-section"><h3>实现路径</h3><div class="flow">${p.flow.map(t=>`<span>${escape(t)}</span>`).join('<b aria-hidden="true">→</b>')}</div></section><section class="dialog-section"><h3>值得关注的实现</h3><ul>${p.highlights.map(t=>`<li>${escape(t)}</li>`).join('')}</ul></section><section class="dialog-section"><h3>项目状态与范围</h3><p>${escape(p.boundary)}</p></section><div class="dialog-actions"><a class="button primary" href="${repoUrl(p.id)}" target="_blank" rel="noopener noreferrer">查看源码 <span>↗</span></a><a class="evidence-link" href="${sourceUrl(p)}" target="_blank" rel="noopener noreferrer">分析依据 ↗</a>${p.extraEvidence?`<a class="evidence-link" href="${sourceUrl(p,p.extraEvidence)}" target="_blank" rel="noopener noreferrer">RAG 说明 ↗</a>`:''}</div>`;
    $('#project-dialog').showModal();document.body.style.overflow='hidden';$('#close-dialog').focus();
  }
  function closeProject(){ $('#project-dialog').close(); }
  $('.filters').addEventListener('click',event=>{const b=event.target.closest('[data-filter]');if(!b)return;activeFilter=b.dataset.filter;document.querySelectorAll('.filter').forEach(el=>{const active=el===b;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});render();});
  $('#search').addEventListener('input',render);
  $('#reset-search').addEventListener('click',()=>{$('#search').value='';$('.filter[data-filter="all"]').click();$('#search').focus();});
  $('#project-grid').addEventListener('click',event=>{const b=event.target.closest('[data-project]');if(b)openProject(b.dataset.project);});
  $('#close-dialog').addEventListener('click',closeProject);
  $('#project-dialog').addEventListener('click',event=>{const d=$('#project-dialog'),r=d.getBoundingClientRect();if(event.target===d&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))closeProject();});
  $('#project-dialog').addEventListener('close',()=>{document.body.style.overflow='';if(previousFocus?.isConnected)previousFocus.focus();});
  drawSphere();render();
})();
