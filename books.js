let links = document.querySelectorAll(".offcanvas-body .detail");
links.forEach((link) => {
  link.addEventListener("click", () => {
    link.querySelector(".plus").classList.toggle("plus-rotate");
  });
});

let services = document.querySelector(".services");
let boxs = document.querySelectorAll(".services .box");
let offer = document.querySelector(".offer");
let offer_data = document.querySelector(".offer .data");

document.querySelector(".scroll-btn").addEventListener("click", () => {
  window.scrollTo({
    behavior: "smooth",
    top: 0,
    left: 0,
  });
});

window.onscroll = () => {
  if (
    document.documentElement.scrollTop >= document.documentElement.clientHeight
  ) {
    document.querySelector(".scroll-btn").style.right = "25px";
  } else document.querySelector(".scroll-btn").style.right = "-100%";

  if (document.documentElement.scrollTop >= services.offsetHeight) {
    let timer = 500;
    boxs.forEach((box) => {
      setTimeout(() => {
        box.style.bottom = "0px";
      }, timer);
      timer += 100;
    });
  }

  if (
    document.documentElement.scrollTop >=
    offer.getBoundingClientRect().top +
      (document.documentElement.scrollTop - 500)
  ) {
    offer_data.style.bottom = "0px";
  }
};

let arr = [];
let items = "";
let table = "";
let category = "";
let top_rate = "";
let swiper_wrapper = document.querySelector(".feature-book .swiper-wrapper");
let swiper_wrapper_category = document.querySelector(
  ".category .swiper-wrapper"
);
let rate = document.querySelector(".rating .boxs");
let modal = document.querySelector(".modal-html");
let arr_cart = JSON.parse(localStorage.getItem("product")) || [];
show_products(arr_cart);
console.log(arr_cart);

function detail_box(index) {
  // Remove any existing modal with the same ID to avoid duplication
  const existingModal = document.getElementById(`modal-${arr[index].id}`);
  if (existingModal) {
    existingModal.remove();
  }

  // Create the modal HTML structure
  let item = `
  <div
      class="modal fade"
      id="modal-${arr[index].id}"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
     <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body row">
            <div class="photo col-xl-6 col-md-4 col-sm-12">
              <img src="${arr[index].img_book}" alt="..." />
            </div>
            <div class="info col-xl-6 col-md-8 col-sm-12">
              <div class="title">${arr[index].title}</div>
              <div class="rate">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i> (1 customer reviews)
              </div>
              <div class="detail">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </div>
              <div class="price">
                <p>$${arr[index].price}.00</p>
                <p>
                  <i class="fa-solid fa-heart"></i>
                  <i class="fa-solid fa-shuffle"></i>
                </p>
              </div>
              <div class="amount">
                <div class="plus-minus">
                  <p class="minus">-</p>
                  <p class="number">1</p>
                  <p class="plus">+</p>
                </div>
                <div class="btn">Read A Little</div>
                <div class="btn btn-cart">
                  <i class="fa-solid fa-cart-shopping"></i>Add To Cart
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Append modal HTML to the body
  document.body.insertAdjacentHTML("beforeend", item);

  // Wait until the modal is fully inserted into the DOM
  const modalElement = document.getElementById(`modal-${arr[index].id}`);

  if (modalElement) {
    console.log("Modal element found:", modalElement);

    // Delay initialization slightly to ensure DOM has rendered fully
    setTimeout(() => {
      try {
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
      } catch (error) {
        console.error("Error initializing modal:", error);
      }
    }, 50); // Delay to ensure modal is rendered

    let plus = modalElement.querySelector(".plus");
    let minus = modalElement.querySelector(".minus");
    let number = modalElement.querySelector(".number");

    plus.addEventListener("click", () => {
      let currentNumber = +number.textContent;
      currentNumber++;
      number.innerHTML = currentNumber;
    });

    minus.addEventListener("click", () => {
      let currentNumber = +number.textContent;
      if (currentNumber > 1) {
        currentNumber--;
        number.innerHTML = currentNumber;
      }
    });

    let cart_btn = modalElement.querySelector(".modal-body .btn-cart");
    cart_btn.addEventListener("click", () => {
      add_cart_modal(index, number);
    });
  } else {
    console.error("Modal element not found in the DOM.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      arr.push(...data);

      arr.forEach((data, index) => {
        items += `
       <div class="box swiper-slide">
            <div class="image">
              <img src= ${data.img_book} alt="" />
               <div class="icons">
              <i class="fa-solid fa-heart"></i>
              <i class="fa-solid fa-shuffle"></i>
          <i class="fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#modal${data.id}">
                  </i>
              </div>
            </div>
            <div class="data">
              <p class="design">Design Look Book</p>
              <p class="name"> ${data.title} </p>
              <p class="price">$${data.price}.00 </p>
              <div class="rate">
                <div class="auther">
                  <img src= ${data.img_rate} alt="" />
                   Wilson
                </div>
                <div class="star">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
              </div>
            </div>
            <div class="btn btn-cart"> <i class="fa-solid fa-cart-shopping"></i> Add To Cart</div>
          </div>
        `;

        category += `
         <div class="swiper-slide">
          <div class="card">
            <div class="photo">
              <div class="dashed">
                <span>04</span>
                <img src=${data.img_book} alt="" />
              </div>
            </div>
            <p class="name">${data.title}</p>
          </div>
        </div>
        `;

        top_rate += `
           <div class="rate col-xl-5 col-md-10">
          <div class="image">
            <img src=${data.img_book} alt="" />
          </div>
          <div class="info">
            <div class="name">
              <div class="data">
                <p>Design Low Book</p>
                <p class="title">${data.title}</p>
              </div>
              <div class="icons">
                <i class="fa-solid fa-heart"></i>
                <i class="fa-solid fa-shuffle"></i>
                <i
                  class="fa-solid fa-eye"
                  data-bs-toggle="modal"
                  data-bs-target="#modal${data.id}"
                >
                </i>
              </div>
            </div>
            <div class="price">$${data.price}.00</div>
            <div class="client">
              <img src= ${data.img_rate} alt="" />
              wilson
            </div>
            <div class="footer">
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <div class="btn btn-cart">
                <i class="fa-solid fa-cart-shopping"></i> Add To Cart
              </div>
            </div>
          </div>
        </div>
        `;

        swiper_wrapper.innerHTML = items;
        swiper_wrapper_category.innerHTML = category;
        rate.innerHTML =
          `<p class="section-title">Top Rating Books</p>` + top_rate;

        let cart_btn = document.querySelectorAll(".box .btn-cart");
        cart_btn.forEach((btn, index) => {
          btn.addEventListener("click", () => {
            add_cart_box(index);
          });
        });
      });

      let cart_btn = document.querySelectorAll(".rate .btn-cart");
      cart_btn.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          add_cart_box(index);
        });
      });

      document.querySelectorAll(".box .fa-eye").forEach((icon, index) => {
        icon.addEventListener("click", () => {
          detail_box(index);
        });
      });

      document.querySelectorAll(".rate .fa-eye").forEach((icon, index) => {
        icon.addEventListener("click", () => {
          detail_box(index);
        });
      });
    });
});

var swiper = new Swiper(".feature-book", {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
});

var swiper2 = new Swiper(".swiper-category", {
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function add_cart_box(index) {
  storage_cart(arr[index]);
  document.querySelector(".success-add-cart").classList.add("success");
  setTimeout(() => {
    document.querySelector(".success-add-cart").classList.remove("success");
  }, 3000);
}

function add_cart_modal(index, number) {
  storage_cart(arr[index], number);
  document.querySelector(".success-add-cart").classList.add("success");
  setTimeout(() => {
    document.querySelector(".success-add-cart").classList.remove("success");
  }, 3000);
}

function show_products(arr_cart) {
  if (arr_cart != null) {
    arr_cart.forEach((item) => {
      table += `
  <tr class="row_${item.id}">
    <td>
      <i class="fa-regular fa-circle-xmark close"></i>
    </td>
    <td><img src=${item.img_book} alt="" /></td>
    <td>${item.title.slice(0, 10)}...</td>
    <td class="money">$${item.price}.00</td>
    <td>${item.amount}</td>
    <td class="money subtotal">$${item.price * item.amount}00</td>
  </tr>
`;
    });
  }

  document.querySelector(".offcanvas-body .cart tbody").innerHTML = table;

  let count = 0;
  document.querySelectorAll("table .subtotal").forEach((ele) => {
    count += +ele.textContent.replace("$", "");
  });
  document.querySelector(
    ".final-total"
  ).innerHTML = `<span>FinalTotal</span> : $${count}`;

  document.querySelectorAll("table .close").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      delete_item(index);
    });
  });
}

function delete_item(index) {
  arr_cart.splice(index, 1);

  localStorage.setItem("product", JSON.stringify(arr_cart));

  table = "";
  show_products(arr_cart);
}

function storage_cart(item, number = 1) {
  object = {
    id: item.id,
    title: item.title,
    amount: +number.textContent || 1,
    img_book: item.img_book,
    price: item.price,
  };

  arr_cart.push(object);

  localStorage.setItem("product", JSON.stringify(arr_cart));
  table = "";
  show_products(arr_cart);

  document.querySelector(".offcanvas-body .cart tbody").innerHTML = table;
}

const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");

var swiper_feedback = new Swiper(".swiper-feedback", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: false,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 10,
    modifier: 0.5,
    slideShadows: true,
  },

  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },

  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },

  speed: 1000,
});

var swiper = new Swiper(".swiper-author", {
  slidesPerView: 1, // One slide by default
  spaceBetween: 0, // No extra space between slides by default
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2, // Show 2 slides at screen width 640px or more
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3, // Show 3 slides at screen width 768px or more
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 5, // Show 5 slides at screen width 1024px or more
      spaceBetween: 40,
    },
  },
  centeredSlides: false,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  speed: 1000, // Controls transition speed between slides
});

let quote_arr = [];
let quote_dom = document.querySelector(".modal .quote .content");
let generate_quote = document.querySelector(".modal .quote .generate-quote");
let auto_generate = document.querySelector(".modal .quote .auto-generate");
let stop_generate = document.querySelector(".modal .quote .stop-generate");

fetch("https://dummyjson.com/quotes")
  .then((res) => res.json())
  .then((data) => {
    quote_arr.push(...data.quotes);
  });

generate_quote.addEventListener("click", () => {
  get_quote();
});

auto_generate.addEventListener("click", () => {
  let auto_quote = setInterval(() => {
    get_quote();
  }, 3000);

  stop_generate.addEventListener("click", () => {
    clearInterval(auto_quote);
  });
});

function get_quote() {
  let random_quote = Math.floor(Math.random() * quote_arr.length);
  quote = `
     <p>
           <i
                    class="fa-solid fa-quote-left"
                    style="color: var(--lightblue)"
                  ></i> ${quote_arr[random_quote].quote}
                 <i
                    class="fa-solid fa-quote-left"
                    style="transform: rotateY(180deg); color: var(--lightblue)"
                  ></i>
      </p>
      <p>"${quote_arr[random_quote].author}"</p>
  `;

  quote_dom.innerHTML = quote;
}
