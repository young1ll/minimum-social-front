import { Box } from '@/components/ui/box';
import { Card, CardFooter } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/config';
import Link from 'next/link';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container size={'xl'} className="">
      <Card className="tw-w-full tw-flex xl:tw-flex-row tw-overflow-hidden">
        <Box className="tw-w-0 md:tw-w-full tw-bg-black tw-overflow-hidden">
          sdaf
        </Box>
        <Box className="tw-w-full tw-max-w-[750px]">
          {children}
          <CardFooter className="tw-flex tw-justify-center">
            <p className="tw-text-sm tw-text-gray-500">
              © <Link href={'/'}>{siteConfig.name}</Link>
            </p>
          </CardFooter>
        </Box>
      </Card>
    </Container>
  );
};

export default AuthLayout;
