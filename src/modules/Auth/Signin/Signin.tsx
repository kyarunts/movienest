import { FC } from "react";
import { Layout } from "../../../shared/components/Layout/Layout";
import styles from '../auth.module.css';
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../shared/components/Input/Input";
import { Button } from "../../../shared/components/Button/Button";
import { Link } from "../../../shared/components/Link/Link";

type SigninForm = {
  email: string;
  password: string;
};

export const Signin: FC = () => {
  const { t } = useTranslation();

  const { register, handleSubmit } = useForm<SigninForm>();

  const onSubmit: SubmitHandler<SigninForm> = (data: SigninForm) => {
    console.log(data);
  };

  return <Layout>
    <div className={styles.container}>
      <h1 className={styles.header}>{t('signin.header')}</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          formKey="email"
          register={register}
          placeholder="Email"
        />
        <Input
          placeholder="Password"
          formKey="password"
          register={register}
          type="password"
        />
        <Button>{t('signin.cta')}</Button>
      </form>
      <p className={`${styles.switch} body-s`}>Don't have an account? <Link to="/signup">{t('signup.header')}</Link></p>
    </div>
  </Layout>;
};