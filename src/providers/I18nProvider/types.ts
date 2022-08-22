export interface I18nContextProps {
    locale: LocaleEnum,
    handleChangeLocale: (locale: LocaleEnum) => void
}

export enum LocaleEnum {
    English = 'en',
    French = 'fr',
    Nepali = 'ne'
}
