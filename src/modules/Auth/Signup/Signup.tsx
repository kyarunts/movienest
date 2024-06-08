import React, { FC } from "react";
import styles from '../auth.module.css';
import { Layout } from "../../../components/Layout/Layout";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";

type SignupForm = {
  email: string;
  password: string;
  repeatPassword: string;
};

export const Signup: FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<SignupForm>();

  const onSubmit: SubmitHandler<SignupForm> = (data: SignupForm) => {
    console.log(data);
  };

  return <Layout>
    <div className={styles.container}>
      <h1 className={styles.header}>{t('signup.header')}</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Email"
          formKey="email"
          register={register}
        />
        <Input formKey="password" register={register} />
        <Input formKey="repeatPassword" register={register} />
        <Button>{t('signup.cta')}</Button>
      </form>
    </div>
  </Layout>;
};