import { FC } from "react";
import { useForm } from "react-hook-form";
import { TMovie } from "../movie.types";
import styles from "./movieform.module.css";
import { Input } from "../../../shared/components/Input/Input";
import { useTranslation } from "react-i18next";
import { Button } from "../../../shared/components/Button/Button";

export const MovieForm: FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<TMovie>();
  const onSubmit = (data: TMovie) => {
    console.log(data);
  };

  return <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
    <div className={styles.image}>
      <div className={styles.box}></div>
    </div>
    <div className={styles.fields}>
      <Input
        formKey="title"
        register={register}
        placeholder={t("movie.title")}
      />
      <Input
        formKey="publishingYear"
        register={register}
        placeholder={t("movie.year")}
      />
    </div>
    <div className={styles.actions}>
      <Button type="outlined">Cancel</Button>
      <Button>Confirm</Button>
    </div>
  </form>;
};