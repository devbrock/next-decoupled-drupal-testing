export default async function useDrupalJSONAPI(options) {
  let includeString = "";

  if (options.include) {
    includeString = "?include=";
    options.include.forEach((element) => {
      includeString += element;
    });
  }

  // Fetch the data

  let response = await fetch(
    `${options.baseURL}/${options.apiBase || "jsonapi"}/node/${
      options.collection
    }${includeString}`
  );

  // check if request was successful
  if (response.status === 200) {
    let data = await response.json();
    if (data?.included) {
      let fileURL;
      const download = require("image-downloader");
      data.included.forEach((element) => {
        let isFile = element.type === "file--file";
        isFile && (fileURL = options.baseURL + element.attributes.uri.url);
        console.log(fileURL);
        download
          .image({ url: fileURL, dest: `public/images` })
          .then(({ filename }) => {
            console.log("Saved to", filename);
          })
          .catch((err) => console.error(err));
      });
    }

    // console.log(data);
    return data;
  }
  if (response.status === 404) {
    return { error: "Could not locate the requested information." };
  } else {
    return {
      error: "Uh oh! Something went wrong, please double check your options.",
    };
  }
}
