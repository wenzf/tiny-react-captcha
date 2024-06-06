// import * as React from 'react';
export const keepInputsIneractive = () => {
    if (typeof document === 'object' && typeof window === 'object') {
        const buttons = document.querySelectorAll('button');
        const inputs = document.querySelectorAll('input');
        const links = document.querySelectorAll('a');
        const allInputs = [
            ...Array.from(buttons),
            ...Array.from(inputs),
            ...Array.from(links),
        ];
        //  const allInputs = [...buttons, ...inputs, ...links];
        //    const allInputs = new Set<NodeListOf<HTMLButtonElement | HTMLInputElement | HTMLAnchorElement>>()
        //    allInputs.add(buttons)
        //    allInputs.add(inputs)
        //    allInputs.add(links)
        //   for (let i = 0; i < allInputs.length; i += 1) {
        for (const oneInput of allInputs) {
            //    const oneInput = allInputs[i]
            if (oneInput?.dataset?.captcha !== "listener") {
                const computedValue = window.getComputedStyle(oneInput);
                const hasInlineStyle = oneInput.style.cssText;
                const currentZindex = computedValue.zIndex;
                const currentPosition = computedValue.position;
                console.log({ computedValue, hasInlineStyle });
                if (hasInlineStyle)
                    oneInput.dataset.captchainlinestyle = hasInlineStyle;
                if (currentPosition !== 'relative' && currentPosition !== 'absolute' && currentPosition !== 'fixed') {
                    oneInput.style.position = 'relative';
                    oneInput.dataset.captchaposition = "true";
                }
                if (parseInt(currentZindex) < 2 || currentZindex === 'auto') {
                    oneInput.dataset.captchazindex = currentZindex;
                    oneInput.style.zIndex = '2';
                }
                oneInput.style.position = 'relative';
            }
        }
    }
};
export const resetInputsInteractivity = () => {
    if (typeof document === 'object' && typeof window === 'object') {
        //     const buttons = document.getElementsByTagName('button')
        //     const inputs = document.getElementsByTagName('input')
        //     const links = document.getElementsByTagName('a')
        //
        //     const allInputs = [...buttons, ...inputs, ...links];
        const buttons = document.querySelectorAll('button');
        const inputs = document.querySelectorAll('input');
        const links = document.querySelectorAll('a');
        const allInputs = [
            ...Array.from(buttons),
            ...Array.from(inputs),
            ...Array.from(links),
        ];
        for (let i = 0; i < allInputs.length; i += 1) {
            const oneInput = allInputs[i];
            if (oneInput?.dataset?.captcha !== "listener") {
                if (oneInput.dataset.captchainlinestyle) {
                    oneInput.style.cssText = oneInput.dataset.captchainlinestyle;
                    oneInput.removeAttribute('data-captchainlinestyle');
                }
                else {
                    oneInput.removeAttribute('style');
                }
                if (oneInput.dataset.captchaposition)
                    oneInput.removeAttribute('data-captchaposition');
                if (oneInput.dataset.captchazindex)
                    oneInput.removeAttribute('data-captchazindex');
            }
        }
    }
};
