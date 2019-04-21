
export const get_api_req = async (api_url) => {
  try {
    const response = await fetch(api_url);
    if (!response.ok) {
      throw new Error('HTTP error, status = ' + response.status);
    }
    const data = await response.json();
    return data;
  } catch(err) {
    console.log(err);
  }
}
