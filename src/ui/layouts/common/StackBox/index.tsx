import React, { useState } from 'react';
import { Box, Paragraph } from '../../../components';

import styles from './index.module.scss';
import imageAddIcon from '../../../assets/imageAddIcon.svg';

export const StackBox: React.FC<{
  image?: any;
  stackName: string;
  stackDesc: string;
}> = ({ image, stackName, stackDesc }) => {
  const [selectedImage, setSelectedImage] = useState<any>(image);

  const previewImage = (e: any) => {
    const objectUrl = URL.createObjectURL(e.files[0]);
    setSelectedImage(objectUrl);
  };

  return (
    <Box
      paddingHorizontal="sm2"
      paddingVertical="sm2"
      className={styles.stackBox}
    >
      <Box className={styles.imageWrapper}>
        <Box className={styles.imageContainer}>
          {selectedImage ? (
            <img src={selectedImage} alt="by Zenml" />
          ) : (
            <label className={styles.custom_file_upload}>
              <input
                type="file"
                name="img"
                alt="by Zenml"
                accept="image/*"
                onChange={(e) => previewImage(e.target)}
              />
              <img src={imageAddIcon} alt="imageAddIcon" />
            </label>
          )}
        </Box>
      </Box>

      <Box style={{ marginTop: '8px' }}>
        <Paragraph className={styles.stackName}>
          {stackName}
        </Paragraph>
      </Box>

      <Box marginTop="xs">
        <Paragraph className={styles.stackDesc}>
          {stackDesc}
        </Paragraph>
      </Box>
    </Box>
  );
};
