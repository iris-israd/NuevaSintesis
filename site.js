(function(){
  function $(s,r){return (r||document).querySelector(s);}
  function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}

  /* menú completo */
  var menu=$("#menu"),opener=document.querySelectorAll("[data-menu-open]"),closer=$("#menu-close"),last=null;
  function openMenu(){if(!menu)return;last=document.activeElement;menu.hidden=false;document.body.classList.add("locked");var f=menu.querySelector("a");if(closer)closer.focus();}
  function closeMenu(){if(!menu)return;menu.hidden=true;document.body.classList.remove("locked");if(last&&last.focus)last.focus();}
  for(var i=0;i<opener.length;i++){opener[i].addEventListener("click",openMenu);}
  if(closer){closer.addEventListener("click",closeMenu);}
  document.addEventListener("keydown",function(e){if(e.key==="Escape"&&menu&&!menu.hidden){closeMenu();}});
  if(menu){menu.addEventListener("click",function(e){if(e.target.closest("a")){document.body.classList.remove("locked");}});}

  /* enlace a SIRANS (config.js) */
  var C=window.MNS||{};
  if(C.sirans){
    var sl=document.querySelectorAll("[data-sirans]");
    for(var a=0;a<sl.length;a++){sl[a].setAttribute("href",C.sirans);sl[a].setAttribute("target","_blank");sl[a].setAttribute("rel","noopener");}
    var on=document.querySelectorAll("[data-sirans-on]"),off=document.querySelectorAll("[data-sirans-off]");
    for(var b=0;b<on.length;b++){on[b].hidden=false;}
    for(var c=0;c<off.length;c++){off[c].hidden=true;}
  }

  /* copiar correo */
  var cp=document.querySelectorAll("[data-copy]");
  for(var d=0;d<cp.length;d++){
    cp[d].addEventListener("click",function(e){
      var btn=e.currentTarget,txt=btn.getAttribute("data-copy"),msg=document.querySelector("[data-copy-msg]");
      function say(t){if(msg){msg.textContent=t;}}
      function fallback(){
        var l=document.getElementById("mail");
        if(l&&window.getSelection){var r=document.createRange();r.selectNodeContents(l);var sel=window.getSelection();sel.removeAllRanges();sel.addRange(r);}
        say("Selecciona y copia el correo: "+txt);
      }
      try{
        if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(function(){say("Correo copiado.");},fallback);}
        else{fallback();}
      }catch(err){fallback();}
    });
  }

  /* año */
  var y=$("#y");if(y){y.textContent=String(new Date().getFullYear());}

  /* ideario */
  var IDEAS=[
    ["Socialdemocracia","Es el modelo de Dinamarca, Suecia y Alemania: mercado libre, empresa privada y propiedad privada, con impuestos razonables que financian salud y educación. No queremos quitarle nada a nadie, queremos que más gente pueda producir y consumir. Un país con clase media grande es mejor mercado para sus empresas."],
    ["Socioliberalismo","Libertad individual y económica, más igualdad de oportunidades de partida. La libertad no sirve de mucho si alguien nace sin acceso a salud ni educación. Es liberalismo que se preocupa de que todos puedan competir."],
    ["Capitalismo democrático","Reconocemos que el mercado y la empresa privada son el motor de la riqueza. Queremos que el poder económico esté disperso y compita, sin monopolios ni favores del Estado. Es capitalismo con reglas claras, abierto a todos y no solo a unos pocos."],
    ["Antineoliberalismo (parcial)","No estamos en contra del mercado, sino de privatizar sin control lo esencial (salud, agua, pensiones) y de que unos pocos concentren el poder económico. El mercado funciona bien para producir y vender, pero no siempre para garantizar servicios básicos. Es corregir los excesos, no negar lo que funciona."],
    ["Progresismo","Es creer que las cosas se pueden mejorar con evidencia, no con dogmas. Si una política funciona, se mantiene, y si no, se corrige. No es destruir la tradición, es no quedarse quietos frente a problemas que sí tienen solución."],
    ["Reformismo","Cambiar por las vías legales, paso a paso, sin rupturas ni aventuras. Es lo contrario de la revolución. Quien quiere estabilidad y seguridad jurídica debería preferir reformas graduales a que la presión social las imponga de golpe."],
    ["Constitucionalismo","Nadie está por encima de la Constitución: ni el presidente, ni la guerrilla, ni el partido. Reglas claras e instituciones fuertes protegen a todos, incluidos la propiedad y la inversión."],
    ["Republicanismo social","La república es de todos, no de una élite ni de una región. Significa ciudadanos con derechos y deberes, instituciones que sirven al interés general y un Estado que llega a todo el territorio. Es patriotismo con responsabilidad cívica."],
    ["Ambientalismo","Proteger la naturaleza es proteger activos: agua, suelo, turismo, biodiversidad, agricultura. Un país que destruye sus recursos se empobrece. Es administrar bien el patrimonio, como lo haría cualquier buen empresario."],
    ["Feminismo (clásico)","Igualdad ante la ley, mismas oportunidades y salario igual por trabajo igual, y sanción real a la violencia de género. Es el feminismo de derechos. Es un principio básico de justicia y también de eficiencia económica: no aprovechar el talento de la mitad del país es un desperdicio."],
    ["Antirracismo","Igualdad de trato sin importar el origen. En Colombia el racismo se nota en los territorios más pobres, que son mayoritariamente afro e indígenas. Es cuestión de dignidad y también de aprovechar todo el potencial del país."],
    ["Laicismo","El Estado no impone ninguna religión ni favorece a ninguna. Protege la libertad de culto de todos, incluida la de los creyentes, porque nadie debería depender de qué religión gobierne. Es un acuerdo de convivencia que protege tanto al creyente como al no creyente."],
    ["Gobierno abierto","Que los ciudadanos puedan ver en qué se gasta cada peso público. Quien paga impuestos tiene derecho a saberlo. Es la mejor herramienta contra el despilfarro y la corrupción."],
    ["Gobierno electrónico","Trámites digitales, rápidos y sin intermediarios. Menos burocracia, menos filas, menos coimas y menos costo para empresas y ciudadanos. Es hacer un Estado más pequeño en trámites y más eficiente."],
    ["Tolerancia cero","Sin excepciones con la violencia armada, el narcotráfico, la extorsión y la corrupción, venga de donde venga, incluso de nuestros propios aliados y militantes. Ley pareja para todos."],
    ["Interpartidismo","Capacidad de acordar con otros partidos en lo que importa, sin renunciar a los principios. Ningún partido soluciona solo los problemas del país, y la polarización los agrava."],
    ["Tecnodesarrollismo","Usar ciencia, tecnología e innovación para crecer más rápido, producir con valor agregado y dejar de depender de exportar solo materias primas. Es una apuesta por la productividad y la competitividad."]
  ];
  var chips=$("#chips"),panel=$("#panel");
  if(chips&&panel){
    var showIdea=function(i){
      var els=chips.children;
      for(var k=0;k<els.length;k++){els[k].setAttribute("aria-pressed",k===i?"true":"false");}
      panel.innerHTML="";
      panel.appendChild(el("h3",null,IDEAS[i][0]));
      panel.appendChild(el("p",null,IDEAS[i][1]));
    };
    IDEAS.forEach(function(it,i){
      var b=el("button","chip",it[0]);b.type="button";b.setAttribute("aria-pressed","false");
      b.addEventListener("click",function(){showIdea(i);});
      chips.appendChild(b);
    });
    showIdea(0);
  }

  /* reorganización */
  var M=[
    ["Ministerio de Cultura, Deporte y Recreación","MinCultura + MinDeporte",8,"Una sola política de bienestar, identidad y tiempo libre, con infraestructura compartida: escenarios, casas de cultura y programas juveniles.","El deporte de alto rendimiento y la cultura tienen públicos, presupuestos y gremios muy distintos, y el deporte (ministerio desde 2019) puede quedar relegado o diluido."],
    ["Ministerio de Ciencia, Tecnología e Innovación Digital","MinTIC + MinCiencias",7,"Unifica la agenda de conectividad, transformación digital, investigación e innovación.","MinTIC maneja mucho presupuesto de conectividad y espectro, y la ciencia básica podría perder protagonismo. La comunidad científica peleó años por tener ministerio propio."],
    ["Ministerio de Salud, Trabajo y Protección Social","MinSalud + MinTrabajo",4,"Integra la seguridad social completa: salud, pensiones, riesgos laborales y empleo.","Ya existió así hasta 2011 y se separó por inmanejable. Concentraría las reformas más conflictivas del país en una sola cartera, y la salud ya es de por sí enorme."],
    ["Ministerio del Interior y de Justicia","MinInterior + MinJusticia",5,"Une política territorial, orden público civil y sistema de justicia y cárceles.","También se separaron en 2011. Mezcla política partidista con política criminal y penitenciaria (INPEC, USPEC), y concentra poder en una sola cartera."],
    ["Ministerio de Desarrollo Rural y Ambiente Sostenible","MinAgricultura + MinAmbiente",5,"Una sola autoridad para frontera agrícola, deforestación, ganadería y restauración, que hoy se pisan entre sí.","Choque de intereses estructural: el regulador ambiental quedaría bajo el mismo jefe que el promotor de la producción. Riesgo de que el ambiente pierda peso."],
    ["Ministerio de Infraestructura, Vivienda y Territorio","MinTransporte + MinVivienda",7,"Planea juntos obras, vías, ciudades, vivienda y agua potable.","Transporte es muy pesado (ANI, Invías, concesiones) y Vivienda, con agua y saneamiento, sería la hermana menor. Aumenta el riesgo de captura por el sector constructor."],
    ["Comisión de Regulación de Energía, Gas y Agua","CREG + CRA",8,"Un solo regulador tarifario para servicios públicos domiciliarios, con menos duplicidad y más coherencia en subsidios.","Energía y agua son técnicamente muy distintas, y los comisionados expertos son difíciles de reemplazar. Un regulador único sería un blanco más grande para el lobby."],
    ["Superintendencia del Desarrollo Social","Supersolidaria + Supersubsidio",7,"Vigila entidades sociales sin ánimo de lucro: cooperativas, fondos de empleados y cajas de compensación.","La supervisión financiera de las cooperativas de ahorro es técnica y quizá encaje mejor en la Superfinanciera. Las cajas de compensación son un gremio poderoso que resistiría el cambio."],
    ["Ministerio de Hacienda, Industria y Comercio","MinHacienda + MinCIT",3,"Conecta política fiscal, aranceles, comercio exterior y competitividad.","Hacienda es la cartera más fuerte y las prioridades fiscales aplastarían las de fomento industrial y turismo. Sería una cartera sobrecargada y la política comercial perdería autonomía."],
    ["Agencia de Territorio y Desarrollo Rural","ANT + ADR + ART + URT + IGAC",6,"Integra formalización de tierras, proyectos productivos, renovación territorial, restitución y catastro, hoy dispersos y descoordinados.","La URT es transitoria (la Ley 1448 se extiende hasta 2031) y la ART está ligada al Acuerdo de Paz y los PDET. El IGAC tiene vocación técnica propia y la entidad sería inmensa y difícil de gestionar."]
  ];
  var box=$("#mergers"),sortBtns=document.querySelectorAll("[data-sort]");
  if(box){
    var renderM=function(mode){
      var rows=M.map(function(r,i){return {r:r,i:i};});
      if(mode==="via"){rows.sort(function(a,b){return b.r[2]-a.r[2]||a.i-b.i;});}
      box.innerHTML="";
      rows.forEach(function(o){
        var r=o.r,card=el("article","merger");
        card.appendChild(el("h3",null,r[0]));
        card.appendChild(el("div","fuse","Fusiona: "+r[1]));
        var m=el("div","meter"),n=el("b",null,String(r[2])),side=el("div"),bar=el("div","bar");
        bar.setAttribute("role","img");bar.setAttribute("aria-label","Viabilidad "+r[2]+" de 10");
        for(var k=1;k<=10;k++){var s=document.createElement("i");if(k<=r[2])s.className="on";bar.appendChild(s);}
        side.appendChild(el("small",null,"Viabilidad, de 1 a 10"));side.appendChild(bar);
        m.appendChild(n);m.appendChild(side);card.appendChild(m);
        var dl=el("dl"),d1=el("div"),d2=el("div");
        d1.appendChild(el("dt",null,"Qué se gana"));d1.appendChild(el("dd",null,r[3]));
        d2.appendChild(el("dt",null,"Qué hay que cuidar"));d2.appendChild(el("dd",null,r[4]));
        dl.appendChild(d1);dl.appendChild(d2);card.appendChild(dl);box.appendChild(card);
      });
      for(var j=0;j<sortBtns.length;j++){sortBtns[j].setAttribute("aria-pressed",sortBtns[j].getAttribute("data-sort")===mode?"true":"false");}
    };
    for(var j=0;j<sortBtns.length;j++){sortBtns[j].addEventListener("click",function(e){renderM(e.currentTarget.getAttribute("data-sort"));});}
    renderM("orden");
  }
})();
