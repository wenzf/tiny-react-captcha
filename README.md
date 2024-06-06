# Tiny React Captcha

A tiny captcha component for React

- using a `canvas` element to paint chars
- fully customizable
- simple detection of bots by input events
- works for SSR
- no dependencies


## Installation

```sh
yarn add tiny-react-captcha
```

or

```sh
npm install tiny-react-captcha
```


## Properties

| Required | Property  | Type     | Default  | Description  |
| -- | ------------------ | ------------------- | ------------------- | ------------------- |
|`true`| `okCallback`| `(e: true) => void` |  | returns `true` if captcha solved|
|`false`| `failCallback` | `(e: true) => void` |       | returns `true` if amount of attempts is equal or higher than `maxAttempts`|
|`false`| `stringMinLen` | `number` | `1-7` | min length of Captcha string|
|`false`| `stringMaxLen` | `number` | `1-7` | max length of Captcha string|
|`false`| `captchaStringType`, `abcLowerCase`,`abcUpperCase`,`numbers`, `abc123Complete`, `abcComplete`, `abc123Friendly`, `custom` | `abc123Friendly` | type of signs shown as captcha |
|`false`| `captchaCharsCollection` | `string` | `undefined` | a collection of chars and or numbers used for the Captcha |
|`false`| `caseSensitive` | `boolean` | `false` | does user input need to be case sensitive? |
|`false`| `timeBeforeInputInMS` | `number` | `2_000` | if user enters captcha faster, captcha is not considered as solved correctly |
|`false`| `maxAttempts` | `number` | `4` | max number of attempts before abort and optionally `failCallback` fires |
|`false`| `perferedTheme` | `auto`, `light`, `dark` | `auto` | Color theme |
|`false`| `language` |`en`, `de`, `fr`, `it`, `zh`, `es`, `pt`| `en` | language of displayed texts |
|`false`| `useStyleSheet` | `boolean` | `true` | If default CSS stylesheet is included. If set to `false`, no CSS classNames are added |
|`false`| `htmlPropsForm` | `HTMLAttributes<HTMLFormElement>` | `undefined` | inject html props |
|`false`| `htmlPropsTitle` | `HTMLAttributes<HTMLDivElement>` | `undefined` | inject html props |
|`false`| `htmlPropsCanvasFrame` | `HTMLAttributes<HTMLDivElement>` | `undefined` | inject html props |
|`false`| `htmlPropsCanvas` | `HTMLAttributes<HTMLCanvasElement>` | `undefined` | inject html props |
|`false`| `htmlPropsRefreshButton` | `HtmlHTMLAttributes<HTMLButtonElement>` | `undefined` | inject html props |
|`false`| `htmlPropsInputFrame` | `HTMLAttributes<HTMLFieldSetElement>` | `undefined` | inject html props |
|`false`| `htmlPropsLabel` | `HTMLAttributes<HTMLLabelElement>` | `undefined` | inject html props |
|`false`| `htmlPropsLabelText` | `HTMLAttributes<HTMLSpanElement>` | `undefined` | inject html props |
|`false`| `htmlPropsInput` | `HtmlHTMLAttributes<HTMLInputElement>` | `undefined` | inject html props |
|`false`| `htmlPropsOkButton` | `HtmlHTMLAttributes<HTMLButtonElement>` | `undefined` | inject html props |
|`false`| `htmlPropsFail` | `HtmlHTMLAttributes<HTMLDivElement>` | `undefined` | inject html props |
|`false`| `textTitle` | `string` | `undefined` | custom text |
|`false`| `textTryAgain` | `string` | `undefined` | custom text |
|`false`| `textEnterCaptcha` | `string` | `undefined` | custom text |
|`false`| `textOk` | `string` | `undefined` | custom text |
|`false`| `textFail` | `string` | `undefined` | custom text |


## Example

```TSX
function Login() {
    const [captchaOk, setCaptchaOk] = useState(false);
    return (
        <main>
            <h1>Sign in</h1>
            {captchaOk ? (
                <TinyReactCaptcha
                    okCallback={setCaptchaOk}
                />
            ) : (
                <form>
                    <input type="text" />
                    <input type="password" />
                    <input type="submit" />
                </form>
            )}
        </main>
    );
}
```

## Usage with Remix.run

If used in `remix`, you might need to add the package as `serverDependenciesToBundle` in `remix.config.js`

```JSON
  serverDependenciesToBundle: ["tiny-react-captcha"]
```
