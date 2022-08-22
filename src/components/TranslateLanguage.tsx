import React from 'react';
import { LocaleEnum, useI18nContext } from '../providers';

export const TranslateLanguage: React.FC = () => {
   const { locale, handleChangeLocale } = useI18nContext();

   return (
       <div>
           <select value={locale} onChange={(e) => {
               handleChangeLocale(e.target.value as LocaleEnum)
           }}>
              <option value={LocaleEnum.English}>English</option>
              <option value={LocaleEnum.French}>French</option>
              <option value={LocaleEnum.Nepali}>Nepali</option>
           </select>
       </div> 
   );
};
