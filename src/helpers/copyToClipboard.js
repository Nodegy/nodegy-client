export default (id) => {
    let message;
    let codeToCopy = document.querySelector(`#${id}`);
    codeToCopy.setAttribute("type", "text");
    codeToCopy.select();
    try {
        const successful = document.execCommand("copy");
        const msg = successful ? "successfully" : "unsuccessfully";
        message = `copied ${msg}`;
    } catch (err) {
        message = `Error copying: ${err}`;
    }
    codeToCopy.setAttribute("type", "hidden");
    window.getSelection().removeAllRanges();
    return message;
};