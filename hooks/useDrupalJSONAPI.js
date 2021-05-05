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
