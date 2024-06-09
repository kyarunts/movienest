import { FC } from "react";
import styles from '../auth.module.css';
import { Layout } from "../../../shared/components/Layout/Layout";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../shared/components/Input/Input";
import { Button } from "../../../shared/components/Button/Button";
import { Link } from "../../../shared/components/Link/Link";
import { useService } from "../../../shared/hooks/useService";
import { AuthService } from "../auth.service";
import { useStore } from "../../../shared/hooks/useStore";
import { AuthStore } from "../auth.store";
import { TSignupForm } from "../auth.types";

export const Signup: FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<TSignupForm>();
  const {
    signupState
  } = useStore(AuthStore, [
    "signupState"
  ]);
  const authService = useService(AuthService);

  const onSubmit: SubmitHandler<TSignupForm> = (data: TSignupForm) => {
    authService.signup(data);
  };

  return <Layout>
    <div className={styles.container}>
      <h1 className={styles.header}>{t('signup.header')}</h1>
      <h2 className={styles.headerMobile}>{t('signup.header')}</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder={t("auth.email")}
          formKey="email"
          register={register}
        />
        <Input
          placeholder={t("auth.password")}
          formKey="password"
          register={register}
          type="password"
        />
        <Input
          placeholder={t("auth.repeat-password")}
          formKey="repeatPassword"
          register={register}
          type="password"
        />
        <Button>{t('signup.cta')}</Button>
      </form>
      <p className={`${styles.switch} body-s`}>{t('signup.have-account')} <Link to="/signin">{t('signin.header')}</Link></p>
    </div>
  </Layout>;
};