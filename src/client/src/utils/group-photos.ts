import { shuffle } from '.';
import { Photo } from '../graphql';

interface GroupedPhotos {
  [key: string]: Photo[];
}

export const groupByRegion = (photos: Photo[] = []) =>
  // Group by region and return an array of regions.
  // Shuffle regions.
  shuffle(
    Object.values(
      photos.reduce<GroupedPhotos>((result, photo) => {
        // Group photos by region.
        result[photo.region] = [...(result[photo.region] ?? []), photo];
        return result;
      }, {})
    )
  )
    // Shuffle images within a region.
    .map(region => shuffle(region))
    // Flatten to one large array of photos.
    .flat();

// export const groupPhotos = (photos: Photo[] = []) =>
//   Object.values(
//     photos.reduce<GroupedPhotos>((result, photo) => {
//       // Group photos by country.
//       result[photo.country.name] = Object.values(
//         [...(result[photo.country.name] ?? []), photo].reduce<GroupedPhotos>((r, p) => {
//           // Group photos by region inside every country.
//           r[p.region] = [...(r[p.region] ?? []), p];
//           return r;
//         }, {})
//       ).flat();

//       return result;
//     }, {})
//   ).flat();
