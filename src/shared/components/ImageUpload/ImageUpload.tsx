import { FC, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from './imageupload.module.css';
import { DownloadIcon } from "../../../assets/icons/DownloadIcon";
import { useTranslation } from "react-i18next";

type ImageUploadProps = {
  imageURL?: string;
  onImageSelect: (file: File) => void;
};

export const ImageUpload: FC<ImageUploadProps> = ({
  onImageSelect, imageURL
}) => {
  const { t } = useTranslation();
  const [currentImageURL, setCurrentImageURL] = useState<string>();

  useEffect(() => {
    imageURL && setCurrentImageURL(imageURL);
  }, [imageURL]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setCurrentImageURL(URL.createObjectURL(acceptedFiles[0]));
    onImageSelect(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpeg', '.jpg'], 'iamge/png': ['.png'] },
    maxFiles: 1
  });

  return <div className={styles.container} {...getRootProps()}>
    <input {...getInputProps()} />
    {currentImageURL ? <img
      className={styles.image}
      src={currentImageURL}
    /> : <div className={styles.instructions}>
      <div className={styles.icon}>
        <DownloadIcon />
      </div>
      <p className="body-s">
        {t("movie.upload-image-instruction")}
      </p>
    </div>}
  </div>;
};