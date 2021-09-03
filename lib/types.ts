export interface Breed {
  bred_for: string;
  breed_group: string;
  country_code: string;
  height: Metric;
  id: number;
  image: Image;
  life_span: string;
  name: string;
  reference_image_id: string;
  serial: number;
  temperament: string;
  weight: Metric;
}

export interface Metric {
  imperial: string;
  metric: string;
}

export interface Image {
  height: number;
  id: string;
  url: string;
  width: number;
}
