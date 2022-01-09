import { shuffle } from '.';
import { Photo } from '../graphql';

interface GroupedPhotos {
  [key: string]: Photo[];
}

/**
 * Groups photos by region and caption.
 */
export const groupPhotos = (photos: Photo[] = []): Photo[] =>
  // Shuffle whole regions.
  shuffle(
    Object.values(
      photos.reduce<GroupedPhotos>((result, photo) => {
        // Group photos by region and shuffle captions within region.
        result[photo.region] =
          // Shuffle images within a region.
          shuffle(
            Object.values(
              [...(result[photo.region] ?? []), photo].reduce<GroupedPhotos>(
                (_result, _photo) => {
                  // Group photos by caption inside every region.
                  _result[_photo.caption] = [...(_result[_photo.caption] ?? []), _photo];

                  return _result;
                },
                {}
              )
            )
          )
            // Shuffle images within a caption
            .map(caption => shuffle(caption))
            .flat();

        return result;
      }, {})
    )
  )
    // Flatten to one large array of photos.
    .flat();
