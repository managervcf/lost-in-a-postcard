import { Photo } from '../graphql';

interface GroupedPhotos {
  [key: string]: Photo[];
}

export const groupPhotos = (photos: Photo[] = []) =>
  Object.values(
    photos.reduce<GroupedPhotos>((result, photo) => {
      // Group photos by country.
      result[photo.country.name] = Object.values(
        [...(result[photo.country.name] ?? []), photo].reduce<GroupedPhotos>((r, p) => {
          // Group photos by region inside every country.
          r[p.region] = [...(r[p.region] ?? []), p];
          return r;
        }, {})
      ).flat();

      return result;
    }, {})
  ).flat();
