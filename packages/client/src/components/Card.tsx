import { Box, BoxProps } from '@chakra-ui/react';

type Props = BoxProps & {
  children?: React.ReactNode;
};

const Card = ({ children, ...rest }: Props) => {
  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="md" {...rest}>
      {children}
    </Box>
  );
};

export default Card;
