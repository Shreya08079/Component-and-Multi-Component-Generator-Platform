import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    useEffect(() => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        router.replace('/login');
      }
    }, [router]);
    return <Component {...props} />;
  };
}
