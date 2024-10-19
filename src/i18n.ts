import {createI18n} from 'vue-i18n';
import generalFa from "./Lang/generalFa"
import generalEn from "./Lang/generalEn"


const messages = {
    en: {
        ...generalEn
    },
    fa: {
        ...generalFa
    }
}

const i18n = createI18n({
    locale: 'fa',
    fallbackLocale: 'fa',
    messages
})
export default i18n
