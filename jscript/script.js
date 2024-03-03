let isLoading = true;
let count = 0;
// all post section variable
const allPostDiv = document.getElementById("allPostSection");
const allPostLoader = document.getElementById("allPostLoader");

// latest post section variable
const cardSection = document.getElementById("cardSection");
const cardLoader = document.getElementById("CardLoader");

// title div container

const titleContainer = document.getElementById("titleContainer");

const loadPost = async () => {
  try {
    // Display loader before fetching data
    isLoading = true;
    allPostLoader.classList.remove("hidden");

    const res = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/posts"
    );
    const data = await res.json();
    const allPosts = data.posts;
    console.log(allPosts);

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
            class="bg-[#F3F3F5] p-5 lg:p-10 rounded-3xl lg:flex justify-start items-start gap-8 hover:bg-[#797DFC1A] hover:border-[#797DFC] mb-5 hover:border"
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
                <h2 class="mulish font-bold text-xl text-black">${title}</h2>
                <p class="inter text-base font-normal">${description}</p>
                <div class="border-t-4 border-dashed"></div>
                <div class="lg:flex justify-between items-center">
                    <div class="lg:flex lg:justify-center gap-5 items-center">
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
  console.log(latestData);
  isLoading = true;
  cardLoader.classList.remove("hidden");

  latestData.forEach((data) => {
    const { cover_image, profile_image, title, description } = data;
    const { posted_date, designation, name } = data.author;

    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
        <div class="bg-white border border-[#12132D26] rounded-3xl p-6">
        <img
          class="w-full rounded-[20px] mb-4"
          src="${cover_image}"
          alt=""
        />
        <div class="space-y-3">
          <div class="flex justify-start items-center">
            <i class="fa-regular fa-calendar"></i>
            <p class="ml-2">${posted_date}</p>
          </div>
          <h2 class="mulish font-extrabold text-lg text-black">
            ${title}
          </h2>
          <p class="mulish">
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
  }, 1000);
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
      <h2 class="mulish font-semibold text-base text-black">
        ${title}
      </h2>
      <div class="flex justify-center gap-2 items-center">
        <i class="fa-regular fa-eye text-xl"></i>
        <span>${view}</span>
      </div>
    </div>
  </div>
    `;
  titleContainer.appendChild(titleElement);
};

latestPost();
loadPost();
