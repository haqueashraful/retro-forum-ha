let isLoading = true;
let count = 0;
// all post section variable
let allPostDiv = document.getElementById("allPostSection");
const allPostLoader = document.getElementById("allPostLoader");
const allPostArea = document.getElementById("allPostArea");

// latest post section variable
const cardSection = document.getElementById("cardSection");
const cardLoader = document.getElementById("CardLoader");

// title div container
const titleContainer = document.getElementById("titleContainer");

// input area
const inputField = document.getElementById("inputField");
const searchBtn = document.getElementById("searchBtn");

const loadPost = async () => {
  try {
    // Display loader before fetching data
    isLoading = true;
    allPostLoader.classList.remove("hidden");
    allPostArea.classList.add("hidden");

    const res = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/posts"
    );
    const data = await res.json();
    const allPosts = data.posts;

    allPosts.forEach((post) => {
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
            class="bg-[#F3F3F5] p-5 md:p-8 lg:p-10 rounded-3xl md:flex lg:flex justify-start items-start gap-8 hover:bg-[#797DFC1A] hover:border-[#797DFC] mb-5 hover:border"
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
                <div class="lg:flex md:flex justify-between items-center">
                    <div class="lg:flex md:flex lg:justify-center gap-5 items-center">
                    <div class="flex lg:justify-center items-center gap-2">
                        <i class="fa-regular fa-message text-xl"></i>
                        <span class="text-xl">${comment_count}</span>
                    </div>
                    <div class="flex lg:justify-center items-center gap-2">
                        <i class="fa-regular fa-eye text-xl"></i>
                        <span class="text-xl">${view_count}</span>
                    </div>
                    <div class="flex lg:justify-center items-center gap-2">
                        <i class="fa-regular fa-clock text-xl"></i>
                        <span class="text-xl">${posted_time} min</span>
                    </div>
                    </div>
                    <div class="">
                    <button onclick='handleRead("${title.replace(
                      /'/g,
                      "&#39;"
                    )}", ${view_count})' class="btn rounded-full bg-green-600 flex justify-center items-center">
                        <i class="fa-solid fa-envelope-open text-xl p-1 text-white"></i>
                    </button>
                    </div>
                </div>
                </div>
            </div>
            `;
      allPostDiv.appendChild(div);
    });

    // Hide loader after data fetching is completed
    setTimeout(() => {
      isLoading = false;
      allPostLoader.classList.add("hidden");
      allPostArea.classList.remove("hidden");
    }, 2000);
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Handle error (e.g., display an error message)
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
        <div class="bg-white border border-[#12132D26] rounded-3xl min-h-[460px] max-h-[564px] p-6">
        <img
          class="w-full rounded-[20px] mb-4"
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
  console.log(title, view);
  count += 1;
  const readCount = document.getElementById("readCount");
  readCount.innerText = count;

  const titleElement = document.createElement("div");
  titleElement.innerHTML = `
    <div class="space-y-4">
    <div
      class="p-4 bg-white flex justify-between items-center gap-4 rounded-2xl"
    >
      <h2 class="mulish font-semibold text-base lg:text-lg  md:text-sm text-black">
        ${title}
      </h2>
      <div class="flex md:flex-col lg:flex-row justify-center gap-2 items-center">
        <i class="fa-regular fa-eye text-xl"></i>
        <span>${view}</span>
      </div>
    </div>
  </div>
    `;
  titleContainer.appendChild(titleElement);
};

searchBtn.addEventListener("click", async () => {
  let value = inputField.value;
  if(value === ""){
    alert("Please Fill the input Field")
    return;
  }
  
  const elementByCategory = async (value = "categoryName") => {
    isLoading = true;
    allPostLoader.classList.remove("hidden");
    allPostArea.classList.add("hidden");
    allPostDiv.innerHTML = "";

    const res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${value}`
    );
    const data = await res.json();

    console.log(data.posts);
    const allPosts = data.posts;

    if (allPosts.length > 0) {
      allPosts.forEach((post) => {
        console.log(post);
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
              class="bg-[#F3F3F5] p-5 md:p-8 lg:p-10 rounded-3xl md:flex lg:flex justify-start items-start gap-8 hover:bg-[#797DFC1A] hover:border-[#797DFC] mb-5 hover:border"
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
                  <div class="lg:flex md:flex justify-between items-center">
                      <div class="lg:flex md:flex lg:justify-center gap-5 items-center">
                      <div class="flex lg:justify-center items-center gap-2">
                          <i class="fa-regular fa-message text-xl"></i>
                          <span class="text-xl">${comment_count}</span>
                      </div>
                      <div class="flex lg:justify-center items-center gap-2">
                          <i class="fa-regular fa-eye text-xl"></i>
                          <span class="text-xl">${view_count}</span>
                      </div>
                      <div class="flex lg:justify-center items-center gap-2">
                          <i class="fa-regular fa-clock text-xl"></i>
                          <span class="text-xl">${posted_time} min</span>
                      </div>
                      </div>
                      <div class="">
                      <button onclick='handleRead("${title.replace(
                        /'/g,
                        "&#39;"
                      )}", ${view_count})' class="btn rounded-full bg-green-600 flex justify-center items-center">
                          <i class="fa-solid fa-envelope-open text-xl p-1 text-white"></i>
                      </button>
                      </div>
                  </div>
                  </div>
              </div>
              `;
        //   allPostDiv.appendChild(div);

        allPostDiv.appendChild(div);
      });
    } else {
        const rightSide = document.getElementById("rightSide")
        rightSide.classList.add('hidden')
        const noPost = document.createElement("div");
        noPost.classList = "w-full col-span-5 mx-auto"
      noPost.innerHTML = `
                <div class="w-full h-[300px] flex justify-center items-center">
                <img class="w--[300px] h-full" src="images/nodata.png" alt="">
                <h2 class="text-5xl mulish text-error font-black text-center ">No posts found!!!</h2>
              </div>
                `;

                allPostDiv.appendChild(noPost)


    }

    setTimeout(() => {
      isLoading = false;
      allPostLoader.classList.add("hidden");
      allPostArea.classList.remove("hidden");
    }, 2000);
  };

  await elementByCategory(value || "categoryName");
});

latestPost();
loadPost();
