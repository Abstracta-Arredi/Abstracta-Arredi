const products=[
{name:"Onda Mediterranea",cat:"Blu",price:420,shape:"p1",desc:"100 × 140 cm · Acrilico su tela"},
{name:"Terra Quiet",cat:"Neutri",price:390,shape:"p2",desc:"80 × 120 cm · Tecnica mista"},
{name:"Materia",cat:"Caldi",price:450,shape:"p3",desc:"100 × 100 cm · Acrilico su tela"},
{name:"Orizzonte",cat:"Blu",price:360,shape:"p4",desc:"70 × 100 cm · Acrilico su tela"},
{name:"Argilla",cat:"Caldi",price:410,shape:"p5",desc:"90 × 120 cm · Tecnica mista"},
{name:"Luce",cat:"Neutri",price:380,shape:"p6",desc:"80 × 100 cm · Acrilico su tela"}
];
let cart=JSON.parse(localStorage.getItem("abstracta-gallery-cart")||"[]");
const $=s=>document.querySelector(s);
function renderFilters(){let cats=["Tutti",...new Set(products.map(p=>p.cat))];$("#filters").innerHTML=cats.map((c,i)=>`<button class="filter ${i===0?"active":""}" data-cat="${c}">${c}</button>`).join("");document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.cat)})}
function renderProducts(cat="Tutti"){let list=cat==="Tutti"?products:products.filter(p=>p.cat===cat);$("#products").innerHTML=list.map((p)=>`<article class="product-card"><div class="product-img"><div class="shape ${p.shape}"></div></div><div class="product-info"><div><h3>${p.name}</h3><p>${p.desc}</p><button class="buy" onclick="addToCart('${p.name}')">Aggiungi al carrello</button></div><div class="price">€${p.price}</div></div></article>`).join("")}
function addToCart(name){let p=products.find(x=>x.name===name);cart.push(p);save();openCart()}
function removeCart(i){cart.splice(i,1);save()}
function save(){localStorage.setItem("abstracta-gallery-cart",JSON.stringify(cart));renderCart()}
function renderCart(){ $("#cartCount").textContent=cart.length; $("#cartItems").innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-row"><div class="cart-thumb ${p.shape}"></div><div><h4>${p.name}</h4><p>€${p.price}</p><button class="remove" onclick="removeCart(${i})">Rimuovi</button></div></div>`).join(""):`<div style="padding:40px 25px;color:#777">Il carrello è vuoto.</div>`;$("#cartTotal").textContent="€"+cart.reduce((a,p)=>a+p.price,0)}
function openCart(){$("#cart").classList.add("open");$("#overlay").classList.add("show")}
function closeCart(){$("#cart").classList.remove("open");$("#overlay").classList.remove("show")}
$("#cartOpen").onclick=openCart;$("#cartClose").onclick=closeCart;$("#overlay").onclick=closeCart;
$("#menu").onclick=()=>$("#nav").classList.toggle("open");
$("#checkout").onclick=()=>alert("Checkout dimostrativo. Per gli ordini reali bisogna collegare un sistema di pagamento, ad esempio Stripe.");
$("#contactForm").onsubmit=e=>{e.preventDefault();$("#formMsg").textContent="Grazie! La richiesta è stata registrata. Per ora questo modulo è dimostrativo.";e.target.reset()}
renderFilters();renderProducts();renderCart();
