export default class Page {
    async open(path = '') {
        await browser.url(`https://www.saucedemo.com/${path}`)
    }

    async waitForPageLoad() {
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('saucedemo.com'),
            { timeout: 5000, timeoutMsg: 'La página no cargó correctamente' }
        )
    }

    async getCurrentUrl() {
        return await browser.getUrl()
    }
}