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
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().max(100).required(),
  publishingYear: yup.number().required(),
  directorFullName: yup.string().max(70).required()
}).required();

type MovieFormProps = {
  movie?: TMovie;
  onConfirm: (movie: Partial<TMovie>) => void;
  onCancel: () => void;
};

export const MovieForm: FC<MovieFormProps> = ({
  movie, onConfirm, onCancel
}) => {
  const { t } = useTranslation();
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<Partial<TMovie>>({
    resolver: yupResolver(schema),
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
      <ImageUpload
        onImageSelect={onImageSelect}
        imageURL={movie?.imageURL}
      />
    </div>
    <div className={styles.fields}>
      <Input
        parentClass={styles.fullWidth}
        formKey="title"
        register={register}
        placeholder={t("movie.title")}
        errorMessage={errors.title ? t("validation.title") : ''}
      />
      <Input
        parentClass={styles.fullWidth}
        formKey="directorFullName"
        register={register}
        placeholder={t("movie.director")}
        errorMessage={errors.directorFullName ? t("validation.director") : ''}
      />
      <Select
        parentClass={styles.halfWidth}
        {...register('publishingYear')}
        placeholder={t("movie.year")}
        options={MOVIE_YEARS()}
        selectedValue={getValues('publishingYear')}
        errorMessage={errors.publishingYear ? t("validation.publishing-year") : ''}
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