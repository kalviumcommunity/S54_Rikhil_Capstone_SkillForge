import { Box, keyframes } from '@chakra-ui/react';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const TopAlert = () => {
  return (
    <Box
      p={1}
      color={'white'}
      w={'100%'}
      bg={'#1d1d1d'}
      textAlign={'center'}
      position={'relative'}
      overflow={'hidden'}
    >
      ⚠️ &nbsp; Project is under development &nbsp; ⚡️
      <Box
        position={'absolute'}
        bottom={0}
        left={0}
        w={'100%'}
        h={'1.5px'}
        bgGradient="linear-gradient(270deg, #8A3BF3, #9D4EF5, #B05AF7, #C367F9, #D474FB, #E580FD, #F68CFF, #FF99FF)"
        backgroundSize="400% 400%"
        animation={`${gradientAnimation} 5s ease infinite`}
      />
    </Box>
  );
};

export default TopAlert;
