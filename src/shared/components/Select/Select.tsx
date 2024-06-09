import { ChangeEvent, ChangeEventHandler, FC, FocusEventHandler, LegacyRef, forwardRef, useState } from "react";
import styles from './select.module.css';
import { useTranslation } from "react-i18next";

type SelectProps = {
  options: { value: string | number; label: string; }[];
  onChange: ChangeEventHandler;
  onBlur: FocusEventHandler;
  name: string;
  errorMessage?: string;
  parentClass?: string;
  placeholder?: string;
  selectedValue?: string | number | undefined;
};

export const Select: FC<SelectProps> = forwardRef(({
  onChange, onBlur, name, parentClass, placeholder, options, errorMessage, selectedValue
}, ref) => {
  const { t } = useTranslation();

  const [selected, setSelected] = useState<string | number | undefined>(selectedValue);

  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    onChange(e);
  };

  return <div className={`${styles.container} ${parentClass ? parentClass : ''}`}>
    <select
      name={name} ref={ref as LegacyRef<HTMLSelectElement>} onChange={changeHandler} onBlur={onBlur}
      className={`${styles.select} ${!selected ? styles.placeholder : ''}`}
      defaultValue={""}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map(o => <option key={o.value} value={o.value}>
        {t(o.label)}
      </option>)}
    </select>
    {errorMessage && <p className={`${styles.errorMessage} body-xs`}>{errorMessage}</p>}
  </div>;
});