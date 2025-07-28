CREATE TABLE IF NOT EXISTS photos (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  alt_description TEXT,
  created_at DATETIME,
  orientation ENUM('landscape', 'portrait'),
  preview_url TEXT,
  thumb_url TEXT,
  small_url TEXT,
  full_url TEXT,
  blur_hash TEXT,
  download_link TEXT,
  aspect_ratio VARCHAR(16),
  regular_url TEXT,
  full_hd_url TEXT,
  html_link TEXT,
  exif_name TEXT,
  exif_exposure_time VARCHAR(32),
  exif_aperture VARCHAR(32),
  exif_focal_length VARCHAR(32),
  exif_iso VARCHAR(32),
  tags JSON,
  views INT UNSIGNED,
  downloads INT UNSIGNED
);

CREATE TABLE IF NOT EXISTS cache_meta (
  id VARCHAR(64) PRIMARY KEY,
  updated_at DATETIME
);
