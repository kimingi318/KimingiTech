var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

var seemore = document.getElementById("see-more");
function opendiv() {
  seemore.style.display = "block";
}



var sidemenu = document.getElementById("menu");

function openmenu() {
  sidemenu.style.right = "0";
}
function closemenu() {
  sidemenu.style.right = "-200px";
}


var view_tabs = document.getElementsByClassName("viewtabs");
var view_contents = document.getElementsByClassName("viewcontents");

function openviewtab(viewname) {
  for (view_tab of view_tabs) {
    view_tab.classList.remove("activetab");
  }
  for (view_content of view_contents) {
    view_content.classList.remove("active-view");
  }
  event.currentTarget.classList.add("activetab");
  document.getElementById(viewname).classList.add("active-view");
}
var fullimage = document.getElementById("full");
var bodybehaviour = document.getElementById("behaviour");

function openfullscreen(imageSrc) {
  fullimage.style = `display: block;
                     background: url(${imageSrc}) center center;
                    background-size: cover;
                    background-repeat: no-repeat;
                   `;
  bodybehaviour.style = `filter: blur(5px);
                       pointer-events: none;
                       user-select: none;`;
}
function closefullscreen() {
  fullimage.style.display = "none";
  bodybehaviour.style = `user-select: all;
                       pointer-events: all;
                       filter: blur(0);`;
}

document.querySelectorAll(".card-items").forEach((cardItem) => {
  cardItem.addEventListener("click", function () {
    const imgElement = cardItem.querySelector("img");
    const imageSrc = imgElement.src;
    openfullscreen(imageSrc);
  });
});

fetch('../public/data.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('social-icons');
    const socials = data.socialLinks ;
    const cards = data['card-items'];


    socials.forEach(account => {
      const link = document.createElement('a');
      link.href = account.url;
      link.target = "_blank";
      link.innerHTML = `<i class="${account.icon}"></i>`;
      link.classList.add('social-icon');
      container.appendChild(link);
      console.log(`Added icon for ${account.name}`);
    });


    cards.forEach(card => {
      const carditem = document.createElement('div');
      carditem.classList.add('card-items','swiper-slide');
      // carditem.addEventListener('click', function() {
      //   openfullscreen(card.src);
      // });
      carditem.innerHTML = `
        <div class="card-link">
          <img src="${card.src}" alt="${card.alt}" id="img" />
          <p class="badge">${card.badge}</p>
        </div>
      `;
      document.getElementById('card-list').appendChild(carditem);
    });
    }).catch(error => console.error('Error loading JSON:', error));



