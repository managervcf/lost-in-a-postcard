import { gql } from 'apollo-boost';

export interface ClickPhotoData {
  clickPhoto: {
    id: string;
    clicks: number;
  };
}

export interface ClickPhotoVars {
  id: string;
  incrementBy?: number;
}

export const CLICK_PHOTO = gql`
  mutation clickPhoto($id: ID!, $incrementBy: Int) {
    clickPhoto(id: $id, incrementBy: $incrementBy) {
      id
      clicks
    }
  }
`;
