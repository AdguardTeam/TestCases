const getFile = async (fileUrl) => {
    const response = await fetch(window.location.href + fileUrl);
    const responseText = await response.text();
    return responseText;
}

export default getFile;