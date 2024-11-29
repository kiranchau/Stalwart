import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

const LangSelector = () => {
    const { i18n } = useTranslation();
    const [selectedLang, setSelectedLang] = useState('en');

    const changeLanguage = (event) => {
        setSelectedLang(event.target.value);
        i18n.changeLanguage(event.target.value);
        console.log(selectedLang)
    }

    return (
        <div onChange={changeLanguage}>
            <label className="mr10">
            <input type="radio" value="en" name="language" checked={selectedLang === 'en'} /> English</label>
            <label><input type="radio" value="hin" name="language" checked={selectedLang === 'hin'} />Hindi</label>
        </div>
    )
}

export default LangSelector;