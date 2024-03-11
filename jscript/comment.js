 // const elementByCategory = async (value) => {
  //   isLoading = true;
  //   allPostLoader.classList.remove("hidden");
  //   allPostArea.classList.add("hidden");
  //   noPost.classList.add("hidden");
  //   allPostDiv.innerHTML = "";

  //   const res = await fetch(
  //     `https://openapi.programming-hero.com/api/retro-forum/posts?category=${value}`
  //   );
  //   const data = await res.json();

  //   console.log(data.posts);
  //   const allPosts = data.posts;
  //   rightSide.classList.remove("hidden");

  //   if (allPosts.length > 0) {
  //     allPosts.forEach((post) => {
  //       console.log(post);
  //       const {
  //         category,
  //         image,
  //         title,
  //         isActive,
  //         description,
  //         comment_count,
  //         view_count,
  //         posted_time,
  //       } = post;
  //       const { name } = post?.author;

  //       const div = document.createElement("div");
  //       div.innerHTML = `
  //             <div
  //             class="bg-[#F3F3F5] p-5 md:p-8 lg:p-10  rounded-xl md:rounded-2xl lg:rounded-3xl md:flex lg:flex justify-start items-start gap-8 shadow-lg hover:bg-[#797DFC1A] hover:border-[#797DFC] mb-5 hover:border"
  //             >
  //                 <div class="indicator">
  //                 <span ${
  //                   (isActive &&
  //                     `class='indicator-item badge badge-success rounded-full'`) ||
  //                   `class='indicator-item badge badge-error rounded-full'`
  //                 } ></span>
  //                 <img src=${image} alt="image" class="bg-white w-[75px] h-[72px] rounded-2xl">
  //                 </div>
  //                 <div class="space-y-5 w-full">
  //                 <div class="flex justify-start items-center gap-5">
  //                     <h2># <span>${category}</span></h2>
  //                     <h2>Author: <span>${name}</span></h2>
  //                 </div>
  //                 <h2 class="mulish font-bold text-xl md:text-start text-black">${title}</h2>
  //                 <p class="inter text-base font-normal md:text-start">${description}</p>
  //                 <div class="border-t-4 border-dashed"></div>
  //                 <div class="lg:flex md:flex justify-between items-center">
  //                     <div class="lg:flex md:flex lg:justify-center gap-5 items-center">
  //                     <div class="flex lg:justify-center items-center gap-2">
  //                         <i class="fa-regular fa-message text-xl"></i>
  //                         <span class="text-xl">${comment_count}</span>
  //                     </div>
  //                     <div class="flex lg:justify-center items-center gap-2">
  //                         <i class="fa-regular fa-eye text-xl"></i>
  //                         <span class="text-xl">${view_count}</span>
  //                     </div>
  //                     <div class="flex lg:justify-center items-center gap-2">
  //                         <i class="fa-regular fa-clock text-xl"></i>
  //                         <span class="text-xl">${posted_time} min</span>
  //                     </div>
  //                     </div>
  //                     <div class="">
  //                     <button onclick='handleRead("${title.replace(
  //                       /'/g,
  //                       "&#39;"
  //                     )}", ${view_count})' class="btn rounded-full bg-green-600 flex justify-center items-center">
  //                         <i class="fa-solid fa-envelope-open text-xl p-1 text-white"></i>
  //                     </button>
  //                     </div>
  //                 </div>
  //                 </div>
  //             </div>
  //             `;
  //       //   allPostDiv.appendChild(div);

  //       allPostDiv.appendChild(div);
  //     });
  //   } else {
  //     setTimeout(() => {
  //       noPost.classList.remove("hidden");
  //       allPostArea.classList.add("hidden");
  //       rightSide.classList.add("hidden");
  //     }, 2000);
  //   }

  //   setTimeout(() => {
  //     isLoading = false;
  //     allPostLoader.classList.add("hidden");
  //     allPostArea.classList.remove("hidden");
  //   }, 2000);
  // };

  // await elementByCategory(value);