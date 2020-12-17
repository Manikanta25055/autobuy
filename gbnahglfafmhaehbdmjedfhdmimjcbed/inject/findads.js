// console.log("search ads isssss working")
let admainDiv_selector,
  adbottomDiv_selector,
  sponsorDiv_selector,
  searchtext_selector,
  admainDiv_adContent,
  admainDiv_adText,
  admainDiv_adUrl,
  adbottomDiv_adContent,
  adbottomDiv_adText,
  adbottomDiv_adUrl,
  container1_selector,
  container2_selector,
  container3_selector,
  container1_check,
  container1_product,
  container1_price,
  container1_url,
  container1_sitename,
  container2_check,
  container2_product,
  container2_price,
  container2_url,
  container2_sitename,
  container3_check,
  container3_product,
  container3_price,
  container3_url,
  container3_sitename,
  option1,
  option2,
  option2_img,
  option2_url,
  option3,
  option4,
  fbadmainDiv_selector,
  fbad_count,
  fbad_check,
  fbad_url,
  fbad_heading,
  fbad_site,
  fbad_img,
  fbsponsoredadsmainDiv_selector,
  fbsponsoredads_maincheck,
  fbsponsoredads_check1,
  fbsponsoredads_check2,
  fbsponsoredads_url,
  fbsponsoredads_img,
  fbsponsoredads_video,
  fbsponsoredads_logo,
  fbsponsoredads_name,
  fbsponsoredads_description,
  ytadsmainDiv_selector;
// ytads_click1,
// ytads_click2,
// ytads_url;

chrome.runtime.sendMessage({ message: "getselectors" }, (response) => {
  // console.log(response);
  // console.log(response.fb_tags.admainDiv_selector)
  let fb = response.fb_tags;
  let search = response.search_tags;
  let site = response.site_tags;

  admainDiv_selector = search.admainDiv_selector;
  adbottomDiv_selector = search.adbottomDiv_selector;
  sponsorDiv_selector = search.sponsorDiv_selector;
  searchtext_selector = search.searchtext_selector;
  admainDiv_adContent = search.admainDiv_adContent;
  admainDiv_adText = search.admainDiv_adText;
  admainDiv_adUrl = search.admainDiv_adUrl;
  adbottomDiv_adContent = search.adbottomDiv_adContent;
  adbottomDiv_adText = search.adbottomDiv_adText;
  adbottomDiv_adUrl = search.adbottomDiv_adUrl;
  container1_selector = search.container1_selector;
  container2_selector = search.container2_selector;
  container3_selector = search.container3_selector;
  container1_product = search.container1_product;
  container1_price = search.container1_price;
  container1_url = search.container1_url;
  container1_sitename = search.container1_sitename;
  container2_check = search.container2_check;
  container2_product = search.container2_product;
  container2_price = search.container2_price;
  container2_sitename = search.container2_sitename;
  container3_check = search.container3_check;
  container3_product = search.container3_product;
  container3_price = search.container3_price;
  container3_url = search.container3_url;
  container1_check = search.container1_check;
  container2_url = search.container2_url;
  container3_sitename = search.container3_sitename;

  // # Site_selectors:
  option1 = site.option1;
  option2 = site.option2;
  option2_img = site.option2_img;
  option2_url = site.option2_url;
  option3 = site.option3;
  option4 = site.option4;

  // # Fb_Selectors:
  fbadmainDiv_selector = fb.fbadmainDiv_selector;
  fbad_count = fb.fbad_count;
  fbad_check = fb.fbad_check;
  fbad_url = fb.fbad_url;
  fbad_heading = fb.fbad_heading;
  fbad_site = fb.fbad_site;
  fbad_img = fb.fbad_img;

  fbsponsoredadsmainDiv_selector = fb.fbsponsoredadsmainDiv_selector;
  fbsponsoredads_maincheck = fb.fbsponsoredads_maincheck;
  fbsponsoredads_check1 = fb.fbsponsoredads_check1;
  fbsponsoredads_check2 = fb.fbsponsoredads_check2;
  fbsponsoredads_url = fb.fbsponsoredads_url;
  fbsponsoredads_img = fb.fbsponsoredads_img;
  fbsponsoredads_video = fb.fbsponsoredads_video;
  fbsponsoredads_logo = fb.fbsponsoredads_logo;
  fbsponsoredads_name = fb.fbsponsoredads_name;
  fbsponsoredads_description = fb.fbsponsoredads_description;

  let admainDiv = document.querySelectorAll(`${admainDiv_selector}`);
  let adbottomDiv = document.querySelectorAll(`${adbottomDiv_selector}`);
  let sponsorDiv = document.querySelector(`${sponsorDiv_selector}`);
  let fbad = document.querySelector(`${fbadmainDiv_selector}`);

  let searchtext;
  if (document.querySelector(`${searchtext_selector}`))
    searchtext = document.querySelector(`${searchtext_selector}`).value;

  let time = Date.now();
  let ads = [];
  let sponsored = [];
  let siteAds = [];
  let urls = [];
  let siteAdsLength = 0;
  let fbAds = [];
  let fbSponsoredAds = [];
  // let ytAds = [];

  if (admainDiv) {
    let adCount = admainDiv.length;
    for (let i = 0; i < adCount; i++) {
      let adDiv = admainDiv[i];
      // console.log(adDiv)
      // console.log(adDiv.querySelector(`${admainDiv_adContent}`));
      let adContent = adDiv.querySelector(`${admainDiv_adContent}`).innerText;
      let adText = adDiv.querySelector(`${admainDiv_adText}`).innerText;
      let adUrl = adDiv.querySelector(`${admainDiv_adUrl}`).href;
      let agencyUrl = adDiv.querySelector(`${admainDiv_adUrl}`).dataset.rw;
      let temp1 = {
        adtext: adText,
        adcontent: adContent,
        adurl: adUrl,
        agencyurl: agencyUrl,
      };
      ads.push(temp1);
      // console.log(temp1);
    }
  }

  if (sponsorDiv) {
    let container1 = document.querySelector(`${container1_selector}`);
    let container2 = document.querySelector(`${container2_selector}`);
    let container3 = document.querySelector(`${container3_selector}`);

    if (container1) {
      let container1count = container1.childElementCount;
      for (let i = 0; i < container1count; i++) {
        if (container1.children[i].querySelector(`${container1_check}`)) {
          let product;
          let price = container1.children[i].querySelector(
            `${container1_price}`
          ).innerText;
          let url = container1.children[i].querySelector(`${container1_url}`)
            .href;
          let sitename = container1.children[i].querySelector(
            `${container1_sitename}`
          ).innerText;
          if (container1.children[i].querySelector(".OOQrA.jbNdE")) {
            product = container1.children[i].querySelector(
              `${container1_product}`
            ).innerText;
          } else {
            product = null;
          }
          let temp2 = {
            price: price,
            url: url,
            sitename: sitename,
            item: product,
          };
          sponsored.push(temp2);
          // console.log(temp2);
        }
      }
    }
    if (container2) {
      let container2count = container2.children[0].childElementCount;
      for (let k = 0; k < container2count; k++) {
        if (
          container2.children[0].children[k].querySelector(
            `${container2_check}`
          )
        ) {
          let product = container2.children[0].children[k].querySelector(
            `${container2_product}`
          ).innerText;
          let price = container2.children[0].children[k].querySelector(
            `${container2_price}`
          ).innerText;
          let url = container2.children[0].children[k].querySelector(
            `${container2_url}`
          ).href;
          let sitename = container2.children[0].children[k].querySelector(
            `${container2_sitename}`
          ).innerText;
          let temp2 = {
            price: price,
            url: url,
            sitename: sitename,
            item: product,
          };
          sponsored.push(temp2);
          // console.log(temp2);
        }
      }
    }
    if (container3) {
      if (container3.children[0].childElementCount > 0) {
        let container3count = container3.children[0].childElementCount;
        for (let j = 0; j < container3count; j++) {
          if (
            container3.children[0].children[j].querySelector(
              `${container3_check}`
            )
          ) {
            let product = container3.children[0].children[j].querySelector(
              `${container3_product}`
            ).innerText;
            let price = container3.children[0].children[j].querySelector(
              `${container3_price}`
            ).innerText;
            let url = container3.children[0].children[j].querySelector(
              `${container3_url}`
            ).href;
            let sitename = container3.children[0].children[j].querySelector(
              `${container3_sitename}`
            ).innerText;
            let temp3 = {
              price: price,
              url: url,
              sitename: sitename,
              item: product,
            };
            sponsored.push(temp3);
            // console.log(temp3);
          }
        }
      }
    }
  }

  if (adbottomDiv) {
    let adCountB = adbottomDiv.length;
    for (let n = 0; n < adCountB; n++) {
      let adDivB = adbottomDiv[n];
      if (adDivB.querySelector(`${adbottomDiv_adContent}`)) {
        // console.log(adDivB);
        // console.log(adDivB.querySelector(`${adbottomDiv_adContent}`));
        let adContent = adDivB.querySelector(`${adbottomDiv_adContent}`)
          .innerText;
        let adText = adDivB.querySelector(`${adbottomDiv_adText}`).innerText;
        let adUrl = adDivB.querySelector(`${adbottomDiv_adUrl}`).href;
        let agencyUrl = adDiv.querySelector(`${admainDiv_adUrl}`).dataset.rw;
        let temp1 = {
          adtext: adText,
          adcontent: adContent,
          adurl: adUrl,
          agencyurl: agencyUrl,
        };
        ads.push(temp1);
        // console.log(temp1);
      }
    }
  }

  if (admainDiv || sponsorDiv || adbottomDiv) {
    // console.log("search text", searchtext);
    if (ads.length > 0 || sponsored.length > 0)
      chrome.runtime.sendMessage({
        message: "searchadsfound",
        searchtext,
        time,
        ads,
        sponsored,
      });
    // console.log("searchText :" + searchtext);
    // console.log("Time :" + time);
    // console.log("Ads :");
    // console.log(ads);
    // console.log("sponsored :");
    // console.log(sponsored);
  }

  if (fbad) {
    let fcount = document.querySelectorAll(`${fbadmainDiv_selector}`).length;
    // console.log("inside fbad");
    // console.log("fcount", fcount);
    for (let j = 0; j < fcount; j++) {
      // console.log(j, document.querySelectorAll(`${fbadmainDiv_selector}`)[j]);
      if (
        document
          .querySelectorAll(`${fbadmainDiv_selector}`)
          [j].querySelector(`${fbad_check}`)
      ) {
        let temp = {
          url: null,
          heading: null,
          site: null,
          img: null,
        };
        let temp_fbad = document.querySelectorAll(`${fbadmainDiv_selector}`)[j];
        // console.log("temp_fbad", temp_fbad);
        temp.url = temp_fbad.href;
        temp.heading = temp_fbad.querySelectorAll(
          `${fbad_heading}`
        )[0].innerText;
        temp.site = temp_fbad.querySelectorAll(`${fbad_site}`)[1].innerText;
        temp.img = temp_fbad.querySelector(`${fbad_img}`).src;
        fbAds.push(temp);
      }
      if (j == fcount - 1) {
        let time = Date.now();
        // console.log(fbAds);
        chrome.runtime.sendMessage({ message: "fbadsfound", fbAds, time });
        fbAds = [];
      }
    }
  }

  setInterval(() => {
    let tempSitesLength = siteAdsLength;

    let iframe = document.querySelectorAll("iframe");
    let iframeLength = iframe.length;

    let fbsponsored = document.querySelectorAll(
      `${fbsponsoredadsmainDiv_selector}`
    );

    // console.log("fbsponsored", fbsponsored);
    let fbsponsoredLength = fbsponsored.length;

    for (let i = 0; i < fbsponsoredLength; i++) {
      let checksponsored = fbsponsored[i].querySelector(
        `${fbsponsoredads_maincheck}`
      );
      //   console.log(`check sponsored ${i}`, checksponsored);

      if (checksponsored && checksponsored.innerText.length > 40) {
        // console.log(`${i} is a sponsored div`);

        let temp = {
          logo: null,
          name: null,
          description: null,
          url: null,
          img: null,
          video: null,
        };

        let temp_fbsponsored1 = fbsponsored[i].querySelector(
          `${fbsponsoredads_check1}`
        );
        // console.log("temp_fbspon1", temp_fbsponsored1);

        let temp_fbsponsored2 = fbsponsored[i].querySelector(
          `${fbsponsoredads_check2}`
        );

        // console.log("temp_fbspon2", temp_fbsponsored2);

        if (temp_fbsponsored1) {
          // console.log("normal ad in");
          //   if (temp_fbsponsored1.innerText.length > 40) {
          if (temp_fbsponsored1.querySelector(`${fbsponsoredads_url}`)) {
            temp.url = temp_fbsponsored1.querySelector(
              `${fbsponsoredads_url}`
            ).href;
            temp.img = temp_fbsponsored1.querySelector(
              `${fbsponsoredads_img}`
            ).src;
            if (temp_fbsponsored1.querySelector(`${fbsponsoredads_video}`))
              temp.video = temp_fbsponsored1.querySelector(
                `${fbsponsoredads_video}`
              ).src;
            if (temp_fbsponsored1.querySelector(`${fbsponsoredads_logo}`)) {
              temp.logo = temp_fbsponsored1.querySelector(
                `${fbsponsoredads_logo}`
              ).href.baseVal;
            }
            if (temp_fbsponsored1.querySelector(`${fbsponsoredads_name}`)) {
              temp.name = temp_fbsponsored1.querySelector(
                `${fbsponsoredads_name}`
              ).innerText;
            }
            if (
              temp_fbsponsored1.querySelector(`${fbsponsoredads_description}`)
            ) {
              temp.description = temp_fbsponsored1.querySelector(
                `${fbsponsoredads_description}`
              ).innerText;
            }

            // console.log("fbad", temp);
            if (!urls.includes(temp.url)) {
              console.log("fbad", temp);
              urls.push(temp.url);
              fbSponsoredAds.push(temp);
              siteAdsLength++;
            }
          }
          //   }
        }

        if (temp_fbsponsored2) {
          // console.log("list ad in");
          //   if (temp_fbsponsored2.innerText.length > 40) {
          for (let j = 0; j < temp_fbsponsored2.childElementCount; j++) {
            temp.url = temp_fbsponsored2.children[j].querySelector(
              `${fbsponsoredads_url}`
            ).href;
            temp.img = temp_fbsponsored2.children[j].querySelector(
              `${fbsponsoredads_img}`
            ).src;
            if (
              temp_fbsponsored2.children[j].querySelector(
                `${fbsponsoredads_video}`
              )
            )
              temp.video = temp_fbsponsored2.children[j].querySelector(
                `${fbsponsoredads_video}`
              ).src;

            if (temp_fbsponsored2.querySelector(`${fbsponsoredads_logo}`)) {
              temp.logo = temp_fbsponsored2.querySelector(
                `${fbsponsoredads_logo}`
              ).href.baseVal;
            }
            if (temp_fbsponsored2.querySelector(`${fbsponsoredads_name}`)) {
              temp.name = temp_fbsponsored2.querySelector(
                `${fbsponsoredads_name}`
              ).innerText;
            }
            if (
              temp_fbsponsored2.querySelector(`${fbsponsoredads_description}`)
            ) {
              temp.description = temp_fbsponsored2.querySelector(
                `${fbsponsoredads_description}`
              ).innerText;
            }
            // console.log("fbad", temp);
            if (!urls.includes(temp.url)) {
              console.log("fbad", temp);
              urls.push(temp.url);
              fbSponsoredAds.push(temp);
              siteAdsLength++;
            }
          }
          //   }
        }
      }
    }

    for (let i = 0; i < iframeLength; i++) {
      let temp = {
        url: null,
        img: null,
        pageurl: null,
      };
      if (
        iframe[i].contentDocument &&
        iframe[i].contentDocument.querySelector(`${option1}`)
      ) {
        temp.url = iframe[i].contentDocument.querySelector(`${option1}`).href;
        temp.img = iframe[i].contentDocument
          .querySelector(`${option1}`)
          .children[0].getAttribute("src");
        temp.pageurl = window.location.href;
        if (!urls.includes(temp.url)) {
          urls.push(temp.url);
          siteAds.push(temp);
          siteAdsLength++;
        }
      } else if (
        iframe[i].contentDocument &&
        iframe[i].contentDocument.querySelector(
          `${option2} .call-to-action-link`
        )
      ) {
        temp.url = iframe[i].contentDocument.querySelector(
          `${option2} ${option2_url}`
        ).href;
        temp.img = iframe[i].contentDocument
          .querySelector(`${option2} ${option2_img}`)
          .children[0].getAttribute("src");
        temp.pageurl = window.location.href;
        if (!urls.includes(temp.url)) {
          urls.push(temp.url);
          siteAds.push(temp);
          siteAdsLength++;
        }
      } else if (
        iframe[i].contentDocument &&
        iframe[i].contentDocument.querySelector(`${option3}`)
      ) {
        temp.url = iframe[i].contentDocument.querySelector(`${option3}`).href;
        temp.img = iframe[i].contentDocument
          .querySelector(`${option3}`)
          .children[0].getAttribute("src");
        temp.pageurl = window.location.href;
        if (!urls.includes(temp.url)) {
          urls.push(temp.url);
          siteAds.push(temp);
          siteAdsLength++;
        }
      } else if (
        iframe[i].contentDocument &&
        iframe[i].contentDocument.querySelector(`${option4}`)
      ) {
        temp.url = iframe[i].contentDocument
          .querySelector(`${option4}`)
          .children[1].querySelector("a").href;
        temp.pageurl = window.location.href;
        if (!urls.includes(temp.url)) {
          urls.push(temp.url);
          siteAds.push(temp);
          siteAdsLength++;
        }
      }
    }

    if (siteAdsLength > tempSitesLength) {
      let time = Date.now();
      if (siteAds.length > 0) {
        console.log(siteAds);
        chrome.runtime.sendMessage({ message: "siteadsfound", siteAds, time });
        siteAds = [];
        siteAdsLength = 0;
        if (urls.length > 100) {
          urls = [];
        }
      } else if (fbSponsoredAds.length > 0) {
        // console.log("found fbsponsored", fbSponsoredAds);
        chrome.runtime.sendMessage({
          message: "fbsponsoredadsfound",
          fbSponsoredAds,
          time,
        });
        // console.log(fbSponsoredAds);
        fbSponsoredAds = [];
        siteAdsLength = 0;
        if (urls.length > 100) {
          urls = [];
        }
      }
    }

    // if (ytAds.length > 0) {
    //     chrome.runtime.sendMessage({ message: "ytadsfound", ytAds, time });
    //     ytAds = [];
    // }
  }, 3000);
});

//Get Amazon and Flipkart Product price
let currentPage = window.location.href;
let productsArr = [];
let pidArr = [];

//Flipkart search page
if (currentPage.includes("flipkart.com/search")) {
  let searchproductDiv = document.querySelectorAll("._13oc-S");
  let time = Date.now();
  for (let f = 0; f < searchproductDiv.length; f++) {
    let pid = searchproductDiv[f]
      .querySelector(`[data-id]`)
      .getAttribute("data-id");
    let price = searchproductDiv[f]
      .querySelector(`[data-id]`)
      .querySelector("._30jeq3._1_WHN1")
      .innerText.slice("1")
      .replaceAll(",", "");

    let star = null;
    if (searchproductDiv[f].querySelector("._3LWZlK")) {
      star = searchproductDiv[f].querySelector("._3LWZlK").innerText;
    }
    let temp = {
      pid,
      price,
      time,
      star,
    };

    productsArr.push(temp);
    if (f == searchproductDiv.length - 1) {
      // console.log(productsArr);
      chrome.runtime.sendMessage({ message: "productprice", productsArr });
    }
  }
}

//Amazon Search Page
if (currentPage.includes("amazon.in/s?")) {
  let searchproductDiv = document.querySelector(
    ".s-main-slot.s-result-list.s-search-results.sg-row"
  );
  let time = Date.now();
  for (let a = 0; a < searchproductDiv.childElementCount; a++) {
    if (
      document
        .querySelector(".s-main-slot.s-result-list.s-search-results.sg-row")
        .children[a].querySelector("[data-a-color]")
    ) {
      let pid = document
        .querySelector(".s-main-slot.s-result-list.s-search-results.sg-row")
        .children[a].getAttribute("data-asin");
      let price = document
        .querySelector(".s-main-slot.s-result-list.s-search-results.sg-row")
        .children[a].querySelector("[data-a-color]")
        .querySelector(".a-offscreen")
        .innerText.slice(1)
        .replaceAll(",", "");

      let star = null;
      if (
        document
          .querySelector(".s-main-slot.s-result-list.s-search-results.sg-row")
          .children[a].querySelector(".a-icon-alt")
      ) {
        star = document
          .querySelector(".s-main-slot.s-result-list.s-search-results.sg-row")
          .children[a].querySelector(".a-icon-alt").innerText;
        star = star.slice(0, star.indexOf(" out"));
      }

      let temp = {
        pid,
        price,
        time,
        star,
      };
      productsArr.push(temp);
    }

    if (a == searchproductDiv.childElementCount - 1) {
      // console.log(productsArr);
      chrome.runtime.sendMessage({ message: "productprice", productsArr });
    }
  }
}

//Flipkart product page
if (currentPage.includes("pid=") && currentPage.includes("lid=")) {
  let time = Date.now();
  let price = document
    .querySelector("._30jeq3._16Jk6d")
    .innerText.slice(1)
    .replaceAll(",", "");
  let pos = currentPage.indexOf("pid=");
  let newStr = currentPage.slice(pos + 4);
  pos = newStr.indexOf("&");
  newStr = newStr.slice(0, pos);
  let pid = newStr;
  let star = null;
  if (document.querySelector(".hGSR34")) {
    star = document.querySelector(".hGSR34").innerText;
  } else {
    if (document.querySelector("._3LWZlK")) {
      star = document.querySelector("._3LWZlK").innerText;
    }
  }
  let temp = {
    time,
    price,
    pid,
    star,
  };
  productsArr.push(temp);
  // console.log("main product", temp);
  chrome.runtime.sendMessage({ message: "productprice", productsArr });

  setInterval(() => {
    let productpageDiv = document.querySelectorAll("._3YgSsQ._2Xkgrw");

    for (let p = 0; p < productpageDiv.length; p++) {
      if (document.querySelectorAll("._3YgSsQ._2Xkgrw")[p].querySelector("a")) {
        let temppid = document
          .querySelectorAll("._3YgSsQ._2Xkgrw")
          [p].querySelector("a").href;
        let pos = temppid.indexOf("pid=");
        let newStr = temppid.slice(pos + 4);
        pos = newStr.indexOf("&");
        newStr = newStr.slice(0, pos);
        temppid = newStr;

        let tempprice = document
          .querySelectorAll("._3YgSsQ._2Xkgrw")
          [p].querySelector("._30jeq3")
          .innerText.slice(1)
          .replaceAll(",", "");

        let star = null;
        if (productpageDiv[p].querySelector(".hGSR34")) {
          star = productpageDiv[p].querySelector(".hGSR34").innerText;
        } else if (productpageDiv[p].querySelector("._3LWZlK")) {
          star = productpageDiv[p].querySelector("._3LWZlK").innerText;
        }
        let tempobj = {
          pid: temppid,
          price: tempprice,
          time,
          star,
        };
        if (!pidArr.includes(temppid)) {
          pidArr.push(temppid);
          productsArr.push(tempobj);
        }
      }
      if (p == productpageDiv.length - 1) {
        if (productsArr.length > 0) {
          // console.log(productsArr);
          chrome.runtime.sendMessage({ message: "productprice", productsArr });
          productsArr = [];
        }
      }
    }
  }, 3000);
}

//Amazon product page
if (currentPage.includes("/dp/") && currentPage.includes("amazon.in/")) {
  let time = Date.now();
  let price = "";
  if (
    document.querySelector("#price #priceblock_ourprice") &&
    !document
      .querySelector("#price #priceblock_ourprice")
      .innerText.includes("FREE")
  ) {
    let temppos = document
      .querySelector("#price #priceblock_ourprice")
      .innerText.slice(2)
      .replace(",", "")
      .indexOf(".");

    price = document
      .querySelector("#price #priceblock_ourprice")
      .innerText.slice(2)
      .replace(",", "")
      .slice(0, temppos);
  } else if (
    document.querySelector("#price #priceblock_dealprice") &&
    !document
      .querySelector("#price #priceblock_ourprice")
      .innerText.includes("FREE")
  ) {
    let temppos = document
      .querySelector("#price #priceblock_dealprice")
      .innerText.slice(2)
      .replace(",", "")
      .indexOf(".");

    price = document
      .querySelector("#price #priceblock_dealprice")
      .innerText.slice(2)
      .replace(",", "")
      .slice(0, temppos);
  } else if (
    document.querySelector("#price #priceblock_saleprice") &&
    !document
      .querySelector("#price #priceblock_ourprice")
      .innerText.includes("FREE")
  ) {
    let temppos = document
      .querySelector("#price #priceblock_saleprice")
      .innerText.slice(2)
      .replace(",", "")
      .indexOf(".");

    price = document
      .querySelector("#price #priceblock_saleprice")
      .innerText.slice(2)
      .replace(",", "")
      .slice(0, temppos);
  }

  let pos = currentPage.indexOf("/dp/");
  let newStr = currentPage.slice(pos + 4);
  let pid = newStr.slice(0, 10);

  let star = null;
  if (document.querySelector(".a-icon-alt")) {
    star = document.querySelector(".a-icon-alt").innerText;
    star = star.slice(0, star.indexOf(" out"));
  }

  let temp = {
    time,
    price,
    pid,
    star,
  };
  productsArr.push(temp);

  // console.log("sending main produt");
  chrome.runtime.sendMessage({ message: "productprice", productsArr });

  setInterval(() => {
    let productpageDiv = document.querySelectorAll(".a-carousel-card");
    // console.log(productpageDiv);
    for (let p = 0; p < productpageDiv.length; p++) {
      // console.log(p);
      if (
        document
          .querySelectorAll(".a-carousel-card")
          [p].querySelector(".a-color-price")
      ) {
        if (
          document
            .querySelectorAll(".a-carousel-card")
            [p].querySelector(".a-color-price").innerText
        ) {
          let temppid = document
            .querySelectorAll(".a-carousel-card")
            [p].querySelector(".a-link-normal").href;

          if (temppid.includes("%2Fdp%2F")) {
            let pos = temppid.indexOf("%2Fdp%2F");
            let newStr = temppid.slice(pos + 8);
            temppid = newStr.slice(0, 10);
          } else {
            if (temppid.includes("/dp/")) {
              let pos = temppid.indexOf("/dp/");
              let newStr = temppid.slice(pos + 4);
              temppid = newStr.slice(0, 10);
            }
          }

          let tempprice = "";
          if (
            !document
              .querySelectorAll(".a-carousel-card")
              [p].querySelector(".a-color-price")
              .innerText.includes("FREE")
          ) {
            tempprice = document
              .querySelectorAll(".a-carousel-card")
              [p].querySelector(".a-color-price")
              .innerText.slice(1)
              .replaceAll(",", "")
              .slice(
                0,
                document
                  .querySelectorAll(".a-carousel-card")
                  [p].querySelector(".a-color-price")
                  .innerText.slice(1)
                  .replaceAll(",", "")
                  .indexOf(".")
              );
          }
          let star = null;
          if (
            document
              .querySelectorAll(".a-carousel-card")
              [p].querySelector(".a-icon-alt")
          ) {
            star = document
              .querySelectorAll(".a-carousel-card")
              [p].querySelector(".a-icon-alt").innerText;
            star = star.slice(0, star.indexOf(" out"));
          } else if (
            document
              .querySelectorAll(".a-carousel-card")
              [p].querySelector(".a-link-normal.adReviewLink.a-text-normal i")
          ) {
            star = document
              .querySelectorAll(".a-carousel-card")
              [p].querySelector(".a-link-normal.adReviewLink.a-text-normal i")
              .className.slice(-3)
              .replace("-", ".");
          }

          let tempobj = {
            pid: temppid,
            price: tempprice,
            time,
            star,
          };
          // console.log("product", tempobj);
          if (!pidArr.includes(temppid)) {
            pidArr.push(temppid);
            productsArr.push(tempobj);
          }
        }
      }
      if (p == productpageDiv.length - 1) {
        if (productsArr.length > 0) {
          // console.log("sending price");
          // console.log(productsArr);
          chrome.runtime.sendMessage({ message: "productprice", productsArr });
          productsArr = [];
        }
      }
    }
  }, 3000);
}
