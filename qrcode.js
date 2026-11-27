const MENU=[
{id:"o",nama:"Basreng Original",desk:"Gurih asin, bumbu daun jeruk",harga:7000},
{id:"p",nama:"Basreng Pedas",desk:"Cabai kering, pedas nendang",harga:7000}
];



const qty={o:0,p:0};
const rp=n=>"Rp"+n.toLocaleString("id-ID");
const list=document.getElementById("list"),wa=document.getElementById("wa");

list.innerHTML=MENU.map(m=>`<li><div><b>${m.nama}</b><small>${m.desk}</small><span class="price">${rp(m.harga)}</span></div>

<div class="qty"><button aria-label="Kurangi ${m.nama}" data-id="${m.id}" data-d="-1">−</button><output id="q-${m.id}">0</output><button aria-label="Tambah ${m.nama}" data-id="${m.id}" data-d="1">+</button></div></li>`).join("");

list.addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b)return;
  const id=b.dataset.id;qty[id]=Math.max(0,qty[id]+Number(b.dataset.d));
  document.getElementById("q-"+id).textContent=qty[id];update();
});

function total(){return MENU.reduce((s,m)=>s+m.harga*qty[m.id],0)}
function update(){document.getElementById("total").textContent=rp(total());wa.disabled=total()===0}
wa.onclick=()=>{
  const baris=MENU.filter(m=>qty[m.id]>0).map(m=>`- ${m.nama} x${qty[m.id]}`).join("\n");
  const teks=`Halo BAPER, saya mau pesan:\n${baris}\nTotal: ${rp(total())}`;
  const no=document.getElementById("wanum").value.replace(/\D/g,"");
  window.open(`https://wa.me/${no}?text=${encodeURIComponent(teks)}`,"_blank");
};

const box=document.getElementById("qr"),inp=document.getElementById("url");
function draw(){
  box.innerHTML="<img src='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="+encodeURIComponent(inp.value)+"'>";
}

inp.addEventListener("input",draw);draw();