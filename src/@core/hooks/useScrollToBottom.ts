'use client'
const useScrollToBottom = () => {
    if (process.browser) {
        const observer = new ResizeObserver((entries, observer) => {
            for (let entry of entries) {
                const {width, height, top, left} = entry.contentRect;
                window.scrollTo({
                    top: window.document.body.scrollHeight,
                    behavior: 'smooth',
                });
            }
        })

        observer.observe(window.document.body);

        return {
            observer,
        }
    }
}
export default useScrollToBottom;
