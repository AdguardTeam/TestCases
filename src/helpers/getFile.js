const getFile = async (fileUrl) => {
    // eslint-disable-next-line compat/compat
    const response = await fetch(window.location.href + fileUrl);
    const responseText = await response.text();
    return responseText;
};

export default getFile;
