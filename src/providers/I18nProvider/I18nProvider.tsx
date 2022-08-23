import React, { useCallback, useEffect, useState } from 'react';
import { I18nProvider as LinguiI18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import {
    detect,
    fromCookie,
    fromHtmlTag,
    fromNavigator,
    fromPath,
    fromStorage,
    fromSubdomain,
    fromUrl,
} from "@lingui/detect-locale"
import { I18nContext } from './I18nContext';
import { LocaleEnum } from "./types";

// import plural rules for all locales
import { en, fr } from "make-plural";

type Props = {
    children: any
}

i18n.loadLocaleData({
    en: { plurals: en },
    fr: { plurals: fr },
})

const detectLocale = () => {

    let fromPathResult;
    try {
        /*
        Gets data from location.pathname
        Will throw an error is index is wrong
        Uncaught TypeError: Cannot read properties of undefined (reading 'replace')
         */
        fromPathResult = detect(fromPath(0));
    } catch (e) {
        fromPathResult = window.location.pathname
    }


    const result = {
        url: detect(fromUrl("lang")),
        storage: detect(fromStorage("lang", { useSessionStorage: false })),
        /**
         * Recovers the navigator language, it’s also compatible with old browsers like IE11
         */
        navigator: detect(fromNavigator()),
        cookie: detect(fromCookie('lang')),
        /*
        Example:
         <!DOCTYPE html>
            <html lang="en">
            </html>
         */
        tag: detect(fromHtmlTag('lang')),
        fromPath: fromPathResult,
        // Example: https://fr.url.com/
        // gets data from location.href
        // fromSubdomain: detect(fromSubdomain(2)),
    }
    console.log('Result', result);
    return result;
};

const isLocalePresent = (locale: string) => {
    let isPresent = false;
    Object.values(LocaleEnum).forEach(enumLocaleValue => {
        if (enumLocaleValue === locale) {
            isPresent = true;
        }
    })

    return isPresent;
}

export const I18nProvider: React.FC<Props> = ({ children }) => {
    const [ locale, setLocale ] = useState(LocaleEnum.English);

    console.log('Locale', locale)

    const setLocaleIfPresent = useCallback((locale: string) => {
        console.log('enter setLocaleIfPresent')
        if (isLocalePresent(locale)) {
            console.log('SET locale', locale)
            setLocale(locale as LocaleEnum);
        }
    }, [])

    useEffect(() => {
        const { url, storage, navigator } = detectLocale();
        console.log('using effect url storage navigator', url, storage, navigator);

        // if previously data was saved to storage
        if (storage) {
            console.log('enter if (storage)')
            setLocaleIfPresent(storage)
            // if url contains ?lang= query
        } else if (url) {
            console.log('enter if (url)')
            setLocaleIfPresent(url)

        } else if (navigator) {
            console.log('enter if (navigator)', navigator)
            setLocaleIfPresent(navigator)
        }

    }, [ setLocaleIfPresent ]);

    const handleChangeLocale = (locale: LocaleEnum) => {
        document.cookie = `lang=${locale}`;
        localStorage.setItem('lang', locale)
        setLocale(locale);
    };

    useEffect(() => {
        console.log('load locales')
        // Dynamically load the catalogs
        import(`@/locales/${locale}/messages`).then(module => {

            const messages = module.messages;

            i18n.load(locale, messages)
            i18n.activate(locale)
        });
    }, [ locale ])

    return (
      <I18nContext.Provider
        value={{
            locale,
            handleChangeLocale,
        }}
      >
          <LinguiI18nProvider i18n={i18n}>
              {children}
          </LinguiI18nProvider>
      </I18nContext.Provider>
    );
};

