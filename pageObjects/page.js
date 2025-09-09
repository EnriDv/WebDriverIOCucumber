export default class Page {
    async open(path) {
        await browser.url(`https://the-internet.herokuapp.com/${path}`)
    }
}