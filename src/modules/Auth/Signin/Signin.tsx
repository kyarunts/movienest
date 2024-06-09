import { FC } from "react";
import { Layout } from "../../../shared/components/Layout/Layout";
import styles from '../auth.module.css';
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../shared/components/Input/Input";
import { Button } from "../../../shared/components/Button/Button";
import { Link } from "../../../shared/components/Link/Link";
import { Checkbox } from "../../../shared/components/Checkbox/Checkbox";
import { TSigninForm } from "../auth.types";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  remember: yup.boolean().required()
}).required();

export const Signin: FC = () => {
  const { t } = useTranslation();

  const { register, handleSubmit, formState: { errors } } = useForm<TSigninForm>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<TSigninForm> = (data: TSigninForm) => {
    console.log(data);
  };

  return <div className={styles.wrapper}>
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.header}>{t('signin.header')}</h1>
        <h2 className={styles.headerMobile}>{t('signin.header')}</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder={t("auth.email")}
            formKey="email"
            register={register}
            errorMessage={errors.email ? 'A valid email is required' : ''}
          />
          <Input
            placeholder={t("auth.password")}
            formKey="password"
            register={register}
            type="password"
            errorMessage={errors.password ? 'Password required' : ''}
          />
          <Checkbox
            label={t('auth.remember')}
            register={register}
            formKey="remember"
          />
          <Button>{t('signin.cta')}</Button>
        </form>
        <p className={`${styles.switch} body-s`}>{t("signin.no-account")} <Link to="/signup">{t('signup.header')}</Link></p>
      </div>
    </Layout>
  </div>;
};