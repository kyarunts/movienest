import { injectable } from "tsyringe";

@injectable()
export class AssetService {
  public uploadImage = async (file: File) => {
    const url = `https://api.cloudinary.com/v1_1/dgjy6axdi/upload`;
    const fd = new FormData();
    fd.append('upload_preset', 'ntjcdxhx');
    fd.append('file', file);
    const response = await fetch(url, { method: 'POST', body: fd });
    try {
      const res = await response.json();
      return res.secure_url;
    } catch (err) {
      return null;
    }
  };
}