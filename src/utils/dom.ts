export const keepInputsIneractive = () => {

    if (typeof document === 'object' && typeof window === 'object') {

        const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('button')
        const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input')
        const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a')

        const allInputs: (HTMLButtonElement | HTMLInputElement | HTMLAnchorElement)[] = [
            ...Array.from(buttons),
            ...Array.from(inputs),
            ...Array.from(links),
        ];


        for (const oneInput of allInputs) {

            if (oneInput?.dataset?.captcha !== "listener") {

                const computedValue = window.getComputedStyle(oneInput)

                const hasInlineStyle = oneInput.style.cssText
                const currentZindex = computedValue.zIndex
                const currentPosition = computedValue.position

                if (hasInlineStyle) oneInput.dataset.captchainlinestyle = hasInlineStyle;

                if (currentPosition !== 'relative' && currentPosition !== 'absolute' && currentPosition !== 'fixed') {
                    oneInput.style.position = 'relative'
                    oneInput.dataset.captchaposition = "true"
                }

                if (parseInt(currentZindex) < 2 || currentZindex === 'auto') {
                    oneInput.dataset.captchazindex = currentZindex
                    oneInput.style.zIndex = '2'
                }
                oneInput.style.position = 'relative'
            }
        }
    }
}

export const resetInputsInteractivity = () => {

    if (typeof document === 'object' && typeof window === 'object') {

        const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('button')
        const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input')
        const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a')

        const allInputs: (HTMLButtonElement | HTMLInputElement | HTMLAnchorElement)[] = [
            ...Array.from(buttons),
            ...Array.from(inputs),
            ...Array.from(links),
        ];

        for (let i = 0; i < allInputs.length; i += 1) {
            const oneInput = allInputs[i]

            if (oneInput?.dataset?.captcha !== "listener") {

                if (oneInput.dataset.captchainlinestyle) {
                    oneInput.style.cssText = oneInput.dataset.captchainlinestyle
                    oneInput.removeAttribute('data-captchainlinestyle')
                } else {
                    oneInput.removeAttribute('style')
                }

                if (oneInput.dataset.captchaposition) oneInput.removeAttribute('data-captchaposition')
                if (oneInput.dataset.captchazindex) oneInput.removeAttribute('data-captchazindex')

            }
        }
    }
}