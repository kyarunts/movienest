import { FC } from "react";
import styles from '../user.module.css';
import { Layout } from "../../../shared/components/Layout/Layout";
import { useTranslation } from "react-i18next";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../shared/components/Input/Input";
import { Button } from "../../../shared/components/Button/Button";
import { Link } from "../../../shared/components/Link/Link";
import { useService } from "../../../shared/hooks/useService";
import { useStore } from "../../../shared/hooks/useStore";
import { TSignupForm } from "../user.types";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { UserStore } from "../user.store";
import { UserService } from "../user.service";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().matches(/^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/).required(),
  repeatPassword: yup.string().oneOf([yup.ref('password')]).required()
}).required();

export const Signup: FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<TSignupForm>({
    resolver: yupResolver(schema) as Resolver<TSignupForm>
  });
  const {
    signupState
  } = useStore(UserStore, [
    "signupState"
  ]);
  const { signup } = useService(UserService);

  const onSubmit: SubmitHandler<TSignupForm> = (data: TSignupForm) => {
    signup(data);
  };

  return <div className={styles.wrapper}>
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.header}>{t('signup.header')}</h1>
        <h2 className={styles.headerMobile}>{t('signup.header')}</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder={t("auth.email")}
            formKey="email"
            register={register}
            errorMessage={errors.email ? t("validation.email") : ''}
          />
          <Input
            placeholder={t("auth.password")}
            formKey="password"
            register={register}
            type="password"
            errorMessage={errors.password ? t("validation.password") : ''}
          />
          <Input
            placeholder={t("auth.repeat-password")}
            formKey="repeatPassword"
            register={register}
            type="password"
            errorMessage={errors.repeatPassword ? t("validation.repeat-password") : ''}
          />
          <Button>{t('signup.cta')}</Button>
        </form>
        <p className={`${styles.switch} body-s`}>{t('signup.have-account')} <Link to="/signin">{t('signin.header')}</Link></p>
      </div>
    </Layout>
  </div>;
};