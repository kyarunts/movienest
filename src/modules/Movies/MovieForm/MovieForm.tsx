import { FC } from "react";
import { useForm } from "react-hook-form";
import { TMovie } from "../movie.types";
import styles from "./movieform.module.css";
import { Input } from "../../../shared/components/Input/Input";
import { useTranslation } from "react-i18next";
import { Button } from "../../../shared/components/Button/Button";
import { ImageUpload } from "../../../shared/components/ImageUpload/ImageUpload";

type MovieFormProps = {
  movie?: TMovie;
  onConfirm: (movie: Partial<TMovie>) => void;
  onCancel: () => void;
};

export const MovieForm: FC<MovieFormProps> = ({
  movie, onConfirm, onCancel
}) => {
  const { t } = useTranslation();
  const { register, handleSubmit, setValue } = useForm<TMovie>();

  const onImageSelect = (file: File) => {
    setValue('file', file);
  };

  return <form className={styles.form} onSubmit={handleSubmit(onConfirm)}>
    <div className={styles.image}>
      <ImageUpload onImageSelect={onImageSelect} />
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
      <Button
        onClick={onCancel}
        preventDefault={true}
        type="outlined"
      >Cancel</Button>
      <Button>Confirm</Button>
    </div>
  </form>;
};