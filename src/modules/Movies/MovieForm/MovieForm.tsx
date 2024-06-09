import { FC } from "react";
import { useForm } from "react-hook-form";
import { TMovie } from "../movie.types";
import styles from "./movieform.module.css";
import { Input } from "../../../shared/components/Input/Input";
import { useTranslation } from "react-i18next";
import { Button } from "../../../shared/components/Button/Button";
import { ImageUpload } from "../../../shared/components/ImageUpload/ImageUpload";
import { Select } from "../../../shared/components/Select/Select";
import { MOVIE_GENRES, MOVIE_YEARS, MOVIE_COUNTRIES } from "../../../shared/constants/movie.lookup";
import { Rating } from "../../../shared/components/Rating/Rating";

type MovieFormProps = {
  movie?: TMovie;
  onConfirm: (movie: Partial<TMovie>) => void;
  onCancel: () => void;
};

export const MovieForm: FC<MovieFormProps> = ({
  movie, onConfirm, onCancel
}) => {
  const { t } = useTranslation();
  const { register, handleSubmit, setValue, getValues } = useForm<TMovie>({
    defaultValues: { ...movie }
  });

  const onImageSelect = (file: File) => {
    setValue('file', file);
  };

  const onRateChange = (rate: number) => {
    setValue('rating', rate);
  };

  return <form className={styles.form} onSubmit={handleSubmit(onConfirm)}>
    <div className={styles.image}>
      <ImageUpload onImageSelect={onImageSelect} />
    </div>
    <div className={styles.fields}>
      <Input
        parentClass={styles.fullWidth}
        formKey="title"
        register={register}
        placeholder={t("movie.title")}
      />
      <Input
        parentClass={styles.fullWidth}
        formKey="directorFullName"
        register={register}
        placeholder={t("movie.director")}
      />
      <Select
        parentClass={styles.halfWidth}
        {...register('publishingYear')}
        placeholder={t("movie.year")}
        options={MOVIE_YEARS()}
        selectedValue={getValues('publishingYear')}
      />
      <Select
        parentClass={styles.halfWidth}
        {...register('genre')}
        placeholder={t("movie.genre")}
        options={MOVIE_GENRES}
        selectedValue={getValues('genre')}
      />
      <Select
        parentClass={styles.halfWidth}
        {...register('publishingCountry')}
        placeholder={t("movie.country")}
        options={MOVIE_COUNTRIES}
        selectedValue={getValues('publishingCountry')}
      />
      <Rating
        currentRate={getValues('rating') || 0}
        onRateChange={onRateChange}
      />
    </div>
    <div className={styles.actions}>
      <Button
        parentClass={styles.button}
        onClick={onCancel}
        preventDefault={true}
        type="outlined"
      >{t("button.cancel")}</Button>
      <Button
        parentClass={styles.button}
      >{t("button.confirm")}</Button>
    </div>
  </form>;
};