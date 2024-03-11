let isLoading = true;
const readCount = document.getElementById("readCount");
let readNum = 0;
readCount.innerText = readNum;
// all post section variable
let allPostDiv = document.getElementById("allPostSection");
const allPostLoader = document.getElementById("allPostLoader");
const allPostArea = document.getElementById("allPostArea");
const rightSide = document.getElementById("rightSide");
const noPost = document.getElementById("noPost");

// latest post section variable
const cardSection = document.getElementById("cardSection");
const cardLoader = document.getElementById("CardLoader");

// title div container
const titleContainer = document.getElementById("titleContainer");

// input area
const inputField = document.getElementById("inputField");
const searchBtn = document.getElementById("searchBtn");

const loadPost = async (value) => {
  let api;
  try {
    if (value === "") {
      api = "https://openapi.programming-hero.com/api/retro-forum/posts";
    } else {
      api = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${value}`;
    }
    isLoading = true;
    allPostLoader.classList.remove("hidden");
    allPostArea.classList.add("hidden");

    const res = await fetch(api);
    const data = await res.json();
    const allPosts = data.posts;

    allPostDiv.innerHTML = "";

    allPosts.forEach((post, index) => {
      const {
        category,
        image,
        title,
        isActive,
        description,
        comment_count,
        view_count,
        posted_time,
      } = post;
      const { name } = post.author;

      const div = document.createElement("div");
      div.innerHTML = `
            <div
            class="bg-[#F3F3F5] p-5 md:p-8 lg:p-10 rounded-xl md:rounded-2xl lg:rounded-3xl md:flex lg:flex justify-start items-start gap-8 shadow-lg hover:bg-[#797DFC1A] hover:border-[#797DFC] mb-5 hover:border"
            >
                <div class="indicator">
                <span ${
                  (isActive &&
                    `class='indicator-item badge badge-success rounded-full'`) ||
                  `class='indicator-item badge badge-error rounded-full'`
                } ></span>
                <img src=${image} alt="image" class="bg-white w-[75px] h-[72px] rounded-2xl">
                </div>
                <div class="space-y-5 w-full">
                <div class="flex justify-start items-center gap-5">
                    <h2># <span>${category}</span></h2>
                    <h2>Author: <span>${name}</span></h2>
                </div>
                <h2 class="mulish font-bold text-xl md:text-start text-black">${title}</h2>
                <p class="inter text-base font-normal md:text-start">${description}</p>
                <div class="border-t-4 border-dashed"></div>
                <div class=" lg:flex md:flex flex justify-between items-center">
                    <div class="flex lg:justify-center gap-2 md:gap-5 lg:gap-5 items-center">
                    <div class="flex lg:justify-center items-center gap-1 md:gap-2 lg:gap-2">
                        <i class="fa-regular fa-message lg:text-xl md:text-xl text-base"></i>
                        <span class="lg:text-xl md:text-xl text-base">${comment_count}</span>
                    </div>
                    <div class="flex lg:justify-center items-center gap-2">
                        <i class="fa-regular fa-eye lg:text-xl md:text-xl text-base"></i>
                        <span class="lg:text-xl md:text-xl text-base">${view_count}</span>
                    </div>
                    <div class="flex lg:justify-center items-center gap-2">
                        <i class="fa-regular fa-clock lg:text-xl md:text-xl text-base"></i>
                        <span class="lg:text-xl md:text-xl text-base">${posted_time} min</span>
                    </div>
                    </div>
                    <div class="">
                    <button onclick='handleRead("${title.replace(
                      /'/g,
                      "&#39;"
                    )}", ${view_count}, ${index})' class="btn rounded-full bg-green-600 hover:bg-[#797DFC]  flex justify-center items-center">
                        <i class="fa-solid fa-envelope-open text-lg md:text-xl lg:text-xl p-0 md:p-1 lg:p-1 text-white "></i>
                    </button>
                    </div>
                </div>
                </div>
            </div>
            `;
      allPostDiv.appendChild(div);
    });

    setTimeout(() => {
      isLoading = false;
      allPostLoader.classList.add("hidden");
      allPostArea.classList.remove("hidden");
    }, 2000);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

const latestPost = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const latestData = await response.json();
  isLoading = true;
  cardLoader.classList.remove("hidden");
  cardSection.classList.add("hidden");

  latestData.forEach((data) => {
    const { cover_image, profile_image, title, description } = data;
    const { posted_date, designation, name } = data.author;

    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
        <div class="bg-white border border-[#12132D26] rounded-2xl min-h-[460px] max-h-[564px] p-6 shadow-xl">
        <img
          class="w-full rounded-2xl lg:rounded-[20px] md:rounded-[20px] mb-4"
          src="${cover_image}"
          alt=""
        />
        <div class="space-y-3">
          <div class="flex justify-start items-center">
            <i class="fa-regular fa-calendar"></i>
            <p class="ml-2">${
              (posted_date && posted_date) || `No publish date`
            }</p>
          </div>
          <h2 class="mulish font-extrabold text-lg text-black min-h-[56px]">
            ${title}
          </h2>
          <p class="mulish min-h-[75px]">
            ${description}
          </p>
          <div class="flex justify-start items-center gap-5">
            <img src="${profile_image}" class="w-16 h-16 rounded-full bg-black">
            <div>
              <h2 class="mulish font-bold text-lg text-black">
                ${name}
              </h2>
              <p class="mulish text-sm">${
                (designation && designation) || `Unknown`
              }</p>
            </div>
          </div>
        </div>
      </div>
        `;

    cardSection.appendChild(cardDiv);
  });
  setTimeout(() => {
    isLoading = false;
    cardLoader.classList.add("hidden");
    cardSection.classList.remove("hidden");
  }, 2000);
};

const handleRead = (title, view) => {
  readNum += 1;
  readCount.innerText = readNum;
  const titleElement = document.createElement("div");
  titleElement.innerHTML = `
    <div class="space-y-4">
    <div
      class="p-2 md:p-4 lg:p-4 bg-white flex justify-center items-center gap-4 rounded-2xl shadow-lg"
    >
    
    <h5 class="justify-start">${readNum}</h5>
      <h2 class="mulish font-semibold text-base lg:text-lg  md:text-sm text-black">
        ${title}
      </h2>
      <div class="flex md:flex-col lg:flex-row justify-center gap-1 lg:gap-2 md:gap-2 items-center">
        <i class="fa-regular fa-eye text-xl"></i>
        <span>${view}</span>
      </div>
      <div onclick='removeItem(this.parentNode.parentNode)'>
      <i class="fa-regular fa-trash-can text-red-500"></i>
      </div>
    </div>
  </div>
    `;
  titleContainer.appendChild(titleElement);
};

const removeItem = (element) => {
  readNum -= 1;
  readCount.innerText = readNum;

  element.parentNode.removeChild(element);
};

searchBtn.addEventListener("click", () => {
  let value = inputField.value;
  if (value === "") {
    alert("Please Fill the input Field");
    return;
  } else if (value === "all" || value === "ALL" || !value === "") {
    noPost.classList.add("hidden");
    allPostArea.classList.remove("hidden");
    rightSide.classList.remove("hidden");
    loadPost(value);
    return;
  } else {
    loadPost(value);
  }
});

latestPost();
loadPost("");
